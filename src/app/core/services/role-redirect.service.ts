import { Injectable } from '@angular/core';

import { UserRole } from '../../models/user-role.type';

@Injectable({ providedIn: 'root' })
export class RoleRedirectService {
  getDashboardUrl(role: UserRole): string {
    switch (role) {
      case 'candidate':
        return '/candidate/dashboard';
      case 'company':
        return '/company/dashboard';
      case 'admin':
        return '/admin/dashboard';
    }
  }
}
