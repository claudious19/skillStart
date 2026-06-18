import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserRole } from '../../models/user-role.type';
import { AuthService } from '../services/auth.service';
import { RoleRedirectService } from '../services/role-redirect.service';
import { UserDocumentService } from '../services/user-document.service';

export function roleGuard(allowedRoles: UserRole[]): CanActivateFn {
  return async () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const roleRedirectService = inject(RoleRedirectService);
    const userDocumentService = inject(UserDocumentService);
    const user = await authService.waitForAuthState();

    if (!user) {
      return router.createUrlTree(['/auth/login']);
    }

    const appUser = await userDocumentService.getUserDocument(user.uid);

    if (!appUser) {
      // TODO: Replace this redirect with a dedicated invalid-account error state in Prompt 5.
      return router.createUrlTree(['/']);
    }

    if (allowedRoles.includes(appUser.role)) {
      return true;
    }

    return router.createUrlTree([roleRedirectService.getDashboardUrl(appUser.role)]);
  };
}
