import { NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthFlowService } from '../../core/services/auth-flow.service';
import { AuthService } from '../../core/services/auth.service';
import { CandidateProfile } from '../../models';
import { CandidateProfileUpdate, ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-candidate-profile-page',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './candidate-profile-page.component.html',
  styleUrl: './profile-page.shared.css',
})
export class CandidateProfilePageComponent implements OnInit {
  readonly currentYear = new Date().getFullYear();
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authFlowService = inject(AuthFlowService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly profile = signal<CandidateProfile | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    apprenticeshipProfession: ['', [Validators.required]],
    specialisation: ['', [Validators.required]],
    graduationYear: [this.currentYear, [Validators.required, Validators.min(2000), Validators.max(this.currentYear + 1)]],
    skills: ['', [Validators.required]],
    location: ['', [Validators.required]],
    careerGoals: ['', [Validators.required]],
    ipaProject: [''],
    personalProjects: [''],
    certificates: [''],
    githubUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    portfolioUrl: ['', [Validators.pattern(/^https?:\/\/.+/i)]],
    desiredProfessionalFields: [''],
  });

  isFieldInvalid(field: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  getReviewStatusLabel(): string | null {
    const reviewStatus = this.profile()?.reviewStatus;

    switch (reviewStatus) {
      case 'draft':
        return 'Entwurf';
      case 'pending':
        return 'Eingereicht';
      case 'approved':
        return 'Freigegeben';
      case 'rejected':
        return 'Abgelehnt';
      case 'needs_changes':
        return 'Anpassungen nötig';
      default:
        return null;
    }
  }

  getReviewStatusClass(): string {
    switch (this.profile()?.reviewStatus) {
      case 'pending':
        return 'status-badge--pending';
      case 'approved':
        return 'status-badge--approved';
      case 'rejected':
        return 'status-badge--rejected';
      case 'needs_changes':
        return 'status-badge--needs-changes';
      default:
        return 'status-badge--draft';
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      const user = await this.authService.waitForAuthState();

      if (!user) {
        await this.router.navigateByUrl('/auth/login');
        return;
      }

      const profile = await this.profileService.getCandidateProfile(user.uid);

      if (!profile) {
        this.errorMessage.set('Dein Kandidatenprofil konnte nicht geladen werden.');
        return;
      }

      this.profile.set(profile);

      this.form.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        apprenticeshipProfession: profile.apprenticeshipProfession,
        specialisation: profile.specialisation,
        graduationYear: profile.graduationYear,
        skills: profile.skills.join(', '),
        location: profile.location,
        careerGoals: profile.careerGoals,
        ipaProject: profile.ipaProject ?? '',
        personalProjects: profile.personalProjects.join(', '),
        certificates: profile.certificates.join(', '),
        githubUrl: profile.githubUrl ?? '',
        portfolioUrl: profile.portfolioUrl ?? '',
        desiredProfessionalFields: profile.desiredProfessionalFields.join(', '),
      });
    } catch {
      this.errorMessage.set('Das Profil konnte im Moment nicht geladen werden.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.isSaving()) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.authService.currentUser;

    if (!user) {
      await this.router.navigateByUrl('/auth/login');
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const value = this.form.getRawValue();
      const update: CandidateProfileUpdate = {
        firstName: value.firstName.trim(),
        lastName: value.lastName.trim(),
        apprenticeshipProfession: value.apprenticeshipProfession.trim(),
        specialisation: value.specialisation.trim(),
        graduationYear: Number(value.graduationYear),
        skills: value.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        location: value.location.trim(),
        careerGoals: value.careerGoals.trim(),
        ipaProject: value.ipaProject.trim(),
        personalProjects: this.parseCommaSeparatedList(value.personalProjects),
        certificates: this.parseCommaSeparatedList(value.certificates),
        githubUrl: value.githubUrl.trim(),
        portfolioUrl: value.portfolioUrl.trim(),
        desiredProfessionalFields: this.parseCommaSeparatedList(value.desiredProfessionalFields),
      };

      await this.profileService.updateCandidateProfile(user.uid, update);
      this.profile.update((currentProfile) =>
        currentProfile
          ? {
              ...currentProfile,
              ...update,
            }
          : currentProfile,
      );
      this.successMessage.set('Dein Profil wurde gespeichert.');
    } catch {
      this.errorMessage.set('Dein Profil konnte nicht gespeichert werden.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.authFlowService.logout();
    await this.router.navigateByUrl('/');
  }

  private parseCommaSeparatedList(value: string): string[] {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
