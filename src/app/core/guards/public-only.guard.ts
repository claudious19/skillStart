import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { RoleRedirectService } from '../services/role-redirect.service';
import { UserDocumentService } from '../services/user-document.service';

export const publicOnlyGuard: CanMatchFn = async (
  _: Route,
  __: UrlSegment[],
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const roleRedirectService = inject(RoleRedirectService);
  const userDocumentService = inject(UserDocumentService);
  const user = await authService.waitForAuthState();

  if (!user) {
    return true;
  }

  const appUser = await userDocumentService.getUserDocument(user.uid);

  if (!appUser) {
    // TODO: Replace this redirect with a dedicated invalid-account error state in Prompt 5.
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree([roleRedirectService.getDashboardUrl(appUser.role)]);
};
