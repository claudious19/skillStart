import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthFlowService } from '../../core/services/auth-flow.service';
import { AuthService } from '../../core/services/auth.service';
import { CandidateProfileUpdate, ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-candidate-profile-page',
  imports: [ReactiveFormsModule],
  templateUrl: './candidate-profile-page.component.html',
  styleUrl: './profile-page.shared.css',
})
export class CandidateProfilePageComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly authFlowService = inject(AuthFlowService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);

  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    apprenticeshipProfession: ['', [Validators.required]],
    specialisation: ['', [Validators.required]],
    skills: ['', [Validators.required]],
    location: ['', [Validators.required]],
    careerGoals: ['', [Validators.required]],
  });

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

      this.form.patchValue({
        apprenticeshipProfession: profile.apprenticeshipProfession,
        specialisation: profile.specialisation,
        skills: profile.skills.join(', '),
        location: profile.location,
        careerGoals: profile.careerGoals,
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
        apprenticeshipProfession: value.apprenticeshipProfession.trim(),
        specialisation: value.specialisation.trim(),
        skills: value.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        location: value.location.trim(),
        careerGoals: value.careerGoals.trim(),
      };

      await this.profileService.updateCandidateProfile(user.uid, update);
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
}
