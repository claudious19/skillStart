import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthFlowService, InvalidAccountError } from '../../../../core/services/auth-flow.service';
import { MockAuthError } from '../../../../core/services/mock-auth.error';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: '../auth-page.shared.css',
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
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
      const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
      const targetUrl = await this.authFlowService.loginAndResolveRedirect(
        this.form.getRawValue().email,
        this.form.getRawValue().password,
        redirectTo,
      );
      await this.router.navigateByUrl(targetUrl);
    } catch (error) {
      if (error instanceof InvalidAccountError) {
        await this.router.navigate(['/account-error']);
        return;
      }

      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof MockAuthError) {
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/invalid-email':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return 'Die Login-Daten stimmen nicht. Bitte pruefe E-Mail und Passwort.';
        case 'auth/too-many-requests':
          return 'Zu viele Versuche. Bitte warte kurz und versuche es dann erneut.';
      }
    }

    return 'Der Login konnte im Moment nicht abgeschlossen werden. Bitte versuche es erneut.';
  }
}
