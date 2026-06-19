import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthFlowService } from '../../../../core/services/auth-flow.service';
import { MockAuthError } from '../../../../core/services/mock-auth.error';

@Component({
  selector: 'app-reset-password-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password-page.component.html',
  styleUrl: '../auth-page.shared.css',
})
export class ResetPasswordPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async submit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      await this.authFlowService.resetPassword(this.form.getRawValue().email);
      this.successMessage.set('Die Adresse wurde geprueft. Im Demo-Modus werden keine echten Reset-Mails versendet.');
    } catch (error) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof MockAuthError && error.code === 'auth/invalid-email') {
      return 'Bitte gib eine gueltige E-Mail-Adresse ein.';
    }

    return 'Der Passwort-Reset konnte im Moment nicht gestartet werden. Bitte versuche es erneut.';
  }
}
