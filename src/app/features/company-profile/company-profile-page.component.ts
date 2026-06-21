import { NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';
import { UserDocumentService } from '../../core/services/user-document.service';
import { AppUser, Company } from '../../models';

@Component({
  selector: 'app-company-profile-page',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './company-profile-page.component.html',
  styleUrl: '../candidate-profile/profile-page.shared.css',
})
export class CompanyProfilePageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly userDocumentService = inject(UserDocumentService);
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly currentUser = signal<AppUser | null>(null);
  readonly company = signal<Company | null>(null);

  readonly form = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.minLength(20)]],
    location: ['', [Validators.required, Validators.minLength(2)]],
  });

  isFieldInvalid(field: 'description' | 'location'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  getReviewStatusLabel(): string | null {
    const reviewStatus = this.company()?.reviewStatus;

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
    switch (this.company()?.reviewStatus) {
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
      const authUser = await this.authService.waitForAuthState();

      if (!authUser) {
        await this.router.navigateByUrl('/auth/login');
        return;
      }

      const userDoc = await this.userDocumentService.getUserDocument(authUser.uid);
      this.currentUser.set(userDoc);

      if (!userDoc?.companyId) {
        this.errorMessage.set('Dein Firmenprofil konnte nicht geladen werden.');
        return;
      }

      const company = await this.profileService.getCompany(userDoc.companyId);
      this.company.set(company);

      if (!company) {
        this.errorMessage.set('Dein Firmenprofil konnte nicht geladen werden.');
        return;
      }

      this.form.patchValue({
        description: company.description ?? '',
        location: company.location ?? '',
      });
    } catch {
      this.errorMessage.set('Das Firmenprofil konnte im Moment nicht geladen werden.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.isLoading() || this.isSaving()) {
      this.form.markAllAsTouched();
      return;
    }

    const currentUser = this.currentUser();

    if (!currentUser?.companyId) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');
    this.isSaving.set(true);

    try {
      const value = this.form.getRawValue();

      await this.profileService.updateCompany(currentUser.companyId, {
        description: value.description.trim(),
        location: value.location.trim(),
      });

      this.company.update((currentCompany) =>
        currentCompany
          ? {
              ...currentCompany,
              description: value.description.trim(),
              location: value.location.trim(),
            }
          : currentCompany,
      );

      this.successMessage.set('Dein Firmenprofil wurde gespeichert.');
    } catch {
      this.errorMessage.set('Dein Firmenprofil konnte nicht gespeichert werden.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigateByUrl('/');
  }
}
