import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountStatus } from '../../models/account-status.type';
import { AppUser } from '../../models/app-user.model';
import { UserRole } from '../../models/user-role.type';
import { MockDatabaseService } from './mock-database.service';

const VALID_USER_ROLES: UserRole[] = ['candidate', 'company', 'admin'];
const VALID_ACCOUNT_STATUSES: AccountStatus[] = ['active', 'blocked', 'pending'];

@Injectable({ providedIn: 'root' })
export class UserDocumentService {
  private readonly mockDatabase = inject(MockDatabaseService);

  async getUserDocument(uid: string): Promise<AppUser | null> {
    const user = await this.mockDatabase.getUser(uid);
    return this.isValidAppUserData(user) ? user : null;
  }

  watchUserDocument(uid: string): Observable<AppUser | null> {
    return new Observable<AppUser | null>((subscriber) => {
      const subscription = this.mockDatabase.watchUser(uid).subscribe({
        next: (user) => subscriber.next(this.isValidAppUserData(user) ? user : null),
        error: (error) => subscriber.error(error),
      });

      return () => subscription.unsubscribe();
    });
  }

  private isValidAppUserData(data: AppUser | null): data is AppUser {
    if (!data) {
      return false;
    }

    return (
      typeof data.email === 'string' &&
      VALID_USER_ROLES.includes(data.role) &&
      VALID_ACCOUNT_STATUSES.includes(data.accountStatus) &&
      typeof data.createdAt === 'string' &&
      typeof data.updatedAt === 'string'
    );
  }
}
