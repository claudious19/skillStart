import { Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { JobPostFormValue, JobPostService } from '../../core/services/job-post.service';
import { UserDocumentService } from '../../core/services/user-document.service';
import { AppUser, EmploymentType, JobPost } from '../../models';

const EMPLOYMENT_TYPES: { value: EmploymentType; label: string }[] = [
  { value: 'full_time', label: 'Vollzeit' },
  { value: 'part_time', label: 'Teilzeit' },
  { value: 'internship', label: 'Praktikum' },
  { value: 'temporary', label: 'Befristet' },
  { value: 'other', label: 'Andere Form' },
];

const hasVisibleText = Validators.pattern(/\S/);

const commaListRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = typeof control.value === 'string' ? control.value : '';
  const hasItems = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean).length > 0;

  return hasItems ? null : { commaListRequired: true };
};

@Component({
  selector: 'app-company-job-post-form-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-job-post-form-page.component.html',
  styleUrl: './job-posts-page.shared.css',
})
export class CompanyJobPostFormPageComponent implements OnInit {
  readonly employmentTypes = EMPLOYMENT_TYPES;
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly currentUser = signal<AppUser | null>(null);
  readonly jobPost = signal<JobPost | null>(null);
  readonly isEditMode = computed(() => this.jobPostId() !== null);

  private readonly authService = inject(AuthService);
  private readonly userDocumentService = inject(UserDocumentService);
  private readonly jobPostService = inject(JobPostService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobPostId = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, hasVisibleText, Validators.minLength(4)]],
    description: ['', [Validators.required, hasVisibleText, Validators.minLength(30)]],
    location: ['', [Validators.required, hasVisibleText, Validators.minLength(2)]],
    employmentType: this.formBuilder.nonNullable.control<EmploymentType>('full_time', [
      Validators.required,
    ]),
    apprenticeshipProfessions: ['', [Validators.required, commaListRequiredValidator]],
    requiredSkills: ['', [Validators.required, commaListRequiredValidator]],
    desiredSkills: ['', [Validators.required, commaListRequiredValidator]],
    salaryMin: this.formBuilder.nonNullable.control(45000, [
      Validators.required,
      Validators.min(0),
    ]),
    salaryMax: this.formBuilder.nonNullable.control(65000, [
      Validators.required,
      Validators.min(0),
    ]),
    expiresAt: [this.getDefaultExpiryDateInput(), [Validators.required]],
  });

  async ngOnInit(): Promise<void> {
    this.jobPostId.set(this.route.snapshot.paramMap.get('jobPostId'));

    try {
      const authUser = await this.authService.waitForAuthState();

      if (!authUser) {
        await this.router.navigateByUrl('/auth/login');
        return;
      }

      const userDoc = await this.userDocumentService.getUserDocument(authUser.uid);
      this.currentUser.set(userDoc);

      if (!userDoc?.companyId) {
        this.errorMessage.set('Deine Firma konnte nicht geladen werden.');
        return;
      }

      const jobPostId = this.jobPostId();

      if (jobPostId) {
        const jobPost = await this.jobPostService.getCompanyJobPost(userDoc.companyId, jobPostId);

        if (!jobPost) {
          this.errorMessage.set('Dieses Inserat konnte nicht geladen werden.');
          return;
        }

        this.jobPost.set(jobPost);
        if (this.route.snapshot.queryParamMap.get('created') === '1') {
          this.successMessage.set('Das Inserat wurde als Entwurf erstellt.');
        }

        this.form.patchValue({
          title: jobPost.title,
          description: jobPost.description,
          location: jobPost.location,
          employmentType: jobPost.employmentType,
          apprenticeshipProfessions: jobPost.apprenticeshipProfessions.join(', '),
          requiredSkills: jobPost.requiredSkills.join(', '),
          desiredSkills: jobPost.desiredSkills.join(', '),
          salaryMin: jobPost.salaryMin,
          salaryMax: jobPost.salaryMax,
          expiresAt: this.toDateInputValue(jobPost.expiresAt),
        });
      }
    } catch (error) {
      console.error('Job post form loading failed:', error);
      this.errorMessage.set('Das Inserat konnte im Moment nicht geladen werden. Prüfe die Browser-Konsole für Details.');
    } finally {
      this.isLoading.set(false);
    }
  }

  isFieldInvalid(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  hasSalaryRangeError(): boolean {
    const value = this.form.getRawValue();
    return Number(value.salaryMin) > Number(value.salaryMax);
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.hasSalaryRangeError() || this.isSaving()) {
      this.form.markAllAsTouched();
      return;
    }

    const currentUser = this.currentUser();

    if (!currentUser?.companyId) {
      this.errorMessage.set('Deine Firma konnte nicht geladen werden.');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');
    this.isSaving.set(true);

    try {
      const value = this.mapFormValue();
      const jobPostId = this.jobPostId();

      if (jobPostId) {
        await this.jobPostService.updateJobPost(currentUser.companyId, jobPostId, value);
        this.successMessage.set('Das Inserat wurde gespeichert.');
      } else {
        const newJobPostId = await this.jobPostService.createJobPost(currentUser, value);
        await this.router.navigate(['/company/job-posts', newJobPostId, 'edit'], {
          queryParams: { created: '1' },
        });
      }
    } catch (error) {
      console.error('Job post save failed:', error);
      this.errorMessage.set('Das Inserat konnte nicht gespeichert werden. Prüfe die Browser-Konsole für Details.');
    } finally {
      this.isSaving.set(false);
    }
  }

  private mapFormValue(): JobPostFormValue {
    const value = this.form.getRawValue();

    return {
      title: value.title.trim(),
      description: value.description.trim(),
      location: value.location.trim(),
      employmentType: value.employmentType,
      apprenticeshipProfessions: this.parseCommaSeparatedList(value.apprenticeshipProfessions),
      requiredSkills: this.parseCommaSeparatedList(value.requiredSkills),
      desiredSkills: this.parseCommaSeparatedList(value.desiredSkills),
      salaryMin: Number(value.salaryMin),
      salaryMax: Number(value.salaryMax),
      expiresAt: new Date(`${value.expiresAt}T23:59:59`),
    };
  }

  private parseCommaSeparatedList(value: string): string[] {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private getDefaultExpiryDateInput(): string {
    const date = new Date();
    date.setDate(date.getDate() + 60);
    return this.toDateInputValue(date);
  }

  private toDateInputValue(value: unknown): string {
    const date =
      value instanceof Date
        ? value
        : typeof value === 'object' && value !== null && 'toDate' in value
          ? (value as { toDate: () => Date }).toDate()
          : new Date();

    return date.toISOString().slice(0, 10);
  }
}
