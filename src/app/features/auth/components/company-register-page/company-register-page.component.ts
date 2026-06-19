import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthFlowService } from '../../../../core/services/auth-flow.service';
import { MockAuthError } from '../../../../core/services/mock-auth.error';

@Component({
  selector: 'app-company-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-register-page.component.html',
  styleUrl: '../auth-page.shared.css',
})
export class CompanyRegisterPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    companyName: ['', [Validators.required]],
    contactPersonFirstName: ['', [Validators.required]],
    contactPersonLastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async submit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      await this.authFlowService.registerCompany(this.form.getRawValue());
      await this.router.navigateByUrl('/company/profile');
    } catch (error) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof MockAuthError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'Mit dieser E-Mail existiert bereits ein Konto.';
        case 'auth/invalid-email':
          return 'Bitte gib eine gueltige E-Mail-Adresse ein.';
        case 'auth/weak-password':
          return 'Das Passwort ist zu schwach. Bitte verwende mindestens 8 Zeichen.';
      }
    }

    return 'Die Registrierung konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
  }
}
