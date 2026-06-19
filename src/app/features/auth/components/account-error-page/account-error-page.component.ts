import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthFlowService } from '../../../../core/services/auth-flow.service';

@Component({
  selector: 'app-account-error-page',
  imports: [RouterLink],
  templateUrl: './account-error-page.component.html',
  styleUrl: '../auth-page.shared.css',
})
export class AccountErrorPageComponent {
  private readonly authFlowService = inject(AuthFlowService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    await this.authFlowService.logout();
    await this.router.navigateByUrl('/auth/login');
  }
}
