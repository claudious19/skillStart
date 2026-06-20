import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthFlowService } from '../../core/services/auth-flow.service';
import { AuthService } from '../../core/services/auth.service';
<<<<<<< HEAD
import { ProfileService, CompanyUpdate } from '../../core/services/profile.service';
import { UserDocumentService } from '../../core/services/user-document.service';
=======
import { CompanyProfileUpdate, ProfileService } from '../../core/services/profile.service';
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960

@Component({
  selector: 'app-company-profile-page',
  imports: [ReactiveFormsModule],
  templateUrl: './company-profile-page.component.html',
  styleUrl: '../candidate-profile/profile-page.shared.css',
})
export class CompanyProfilePageComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authFlowService = inject(AuthFlowService);
  private readonly profileService = inject(ProfileService);
<<<<<<< HEAD
  private readonly userDocumentService = inject(UserDocumentService);
=======
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
  private readonly router = inject(Router);

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
<<<<<<< HEAD
  readonly companyName = signal('');
  readonly currentCompanyId = signal<string | null>(null);
=======
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960

  readonly form = this.formBuilder.nonNullable.group({
    description: ['', [Validators.required]],
    location: ['', [Validators.required]],
  });

  async ngOnInit(): Promise<void> {
    try {
      const user = await this.authService.waitForAuthState();

      if (!user) {
        await this.router.navigateByUrl('/auth/login');
        return;
      }

<<<<<<< HEAD
      const appUser = await this.userDocumentService.getUserDocument(user.uid);

      if (!appUser?.companyId) {
        this.errorMessage.set('Zu diesem Account ist keine Firma verknüpft.');
        return;
      }

      this.currentCompanyId.set(appUser.companyId);

      const company = await this.profileService.getCompany(appUser.companyId);

      if (!company) {
        this.errorMessage.set('Dein Firmendokument konnte nicht geladen werden.');
        return;
      }

      this.companyName.set(company.companyName);
      this.form.patchValue({
        description: company.description,
        location: company.location,
=======
      const profile = await this.profileService.getCompanyProfile(user.uid);

      if (!profile) {
        this.errorMessage.set('Dein Unternehmensprofil konnte nicht geladen werden.');
        return;
      }

      this.form.patchValue({
        description: profile.description,
        location: profile.location,
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
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

<<<<<<< HEAD
    const companyId = this.currentCompanyId();

    if (!companyId) {
      this.errorMessage.set('Es ist keine Firma für diesen Account hinterlegt.');
=======
    const user = this.authService.currentUser;

    if (!user) {
      await this.router.navigateByUrl('/auth/login');
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const value = this.form.getRawValue();
<<<<<<< HEAD
      const update: CompanyUpdate = {
=======
      const update: CompanyProfileUpdate = {
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
        description: value.description.trim(),
        location: value.location.trim(),
      };

<<<<<<< HEAD
      await this.profileService.updateCompany(companyId, update);
      this.successMessage.set('Dein Firmenprofil wurde gespeichert.');
    } catch {
      this.errorMessage.set('Dein Firmenprofil konnte nicht gespeichert werden.');
=======
      await this.profileService.updateCompanyProfile(user.uid, update);
      this.successMessage.set('Dein Unternehmensprofil wurde gespeichert.');
    } catch {
      this.errorMessage.set('Dein Unternehmensprofil konnte nicht gespeichert werden.');
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
    } finally {
      this.isSaving.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.authFlowService.logout();
    await this.router.navigateByUrl('/');
  }
}
