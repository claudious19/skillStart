import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

import { MockDatabaseService } from './mock-database.service';

export interface AuthSessionUser {
  uid: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly mockDatabase = inject(MockDatabaseService);

  readonly authState$: Observable<AuthSessionUser | null> = this.mockDatabase.authState$;

  get currentUser(): AuthSessionUser | null {
    return this.mockDatabase.currentSession;
  }

  waitForAuthState(): Promise<AuthSessionUser | null> {
    return firstValueFrom(this.authState$);
  }

  async login(email: string, password: string): Promise<AuthSessionUser> {
    return this.mockDatabase.login(email, password);
  }

  async logout(): Promise<void> {
    await this.mockDatabase.logout();
  }

  async resetPassword(email: string): Promise<void> {
    await this.mockDatabase.resetPassword(email);
  }
}
