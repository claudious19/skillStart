import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';
import { UserDocumentService } from '../../core/services/user-document.service';
import { AppUser, Company } from '../../models';

@Component({
  selector: 'app-company-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly currentUser = signal<AppUser | null>(null);
  readonly company = signal<Company | null>(null);

  readonly form = this.fb.nonNullable.group({
    description: ['', [Validators.required, Validators.minLength(20)]],
    location: ['', [Validators.required, Validators.minLength(2)]],
  });

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
    if (this.form.invalid || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }

    const currentUser = this.currentUser();

    if (!currentUser?.companyId) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const value = this.form.getRawValue();

      await this.profileService.updateCompany(currentUser.companyId, {
        description: value.description.trim(),
        location: value.location.trim(),
      });

      this.successMessage.set('Dein Firmenprofil wurde gespeichert.');
    } catch {
      this.errorMessage.set('Dein Firmenprofil konnte nicht gespeichert werden.');
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigateByUrl('/');
  }
}
