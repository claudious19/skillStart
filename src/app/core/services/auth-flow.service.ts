import { Injectable, inject } from '@angular/core';

import { AppUser, UserRole } from '../../models';
import { RoleRedirectService } from './role-redirect.service';
import { UserDocumentService } from './user-document.service';
import { AuthService } from './auth.service';
import { MockDatabaseService } from './mock-database.service';

export interface CandidateRegistrationInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CompanyRegistrationInput {
  email: string;
  password: string;
  companyName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
}

export class InvalidAccountError extends Error {
  constructor() {
    super('The authenticated account is missing a valid users document.');
  }
}

@Injectable({ providedIn: 'root' })
export class AuthFlowService {
  private readonly authService = inject(AuthService);
  private readonly mockDatabase = inject(MockDatabaseService);
  private readonly userDocumentService = inject(UserDocumentService);
  private readonly roleRedirectService = inject(RoleRedirectService);

  async registerCandidate(input: CandidateRegistrationInput): Promise<void> {
    await this.mockDatabase.registerCandidate(input);
  }

  async registerCompany(input: CompanyRegistrationInput): Promise<void> {
    await this.mockDatabase.registerCompany(input);
  }

  async loginAndResolveRedirect(
    email: string,
    password: string,
    redirectTo?: string | null,
  ): Promise<string> {
    const user = await this.authService.login(email, password);
    return this.resolveRedirectForUser(user.uid, redirectTo);
  }

  async resolveRedirectForUser(uid: string, redirectTo?: string | null): Promise<string> {
    const appUser = await this.requireValidAppUser(uid);

    if (redirectTo && this.isAllowedRedirect(redirectTo, appUser.role)) {
      return redirectTo;
    }

    return this.roleRedirectService.getDashboardUrl(appUser.role);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  async resetPassword(email: string): Promise<void> {
    await this.authService.resetPassword(email);
  }

  private async requireValidAppUser(uid: string): Promise<AppUser> {
    const appUser = await this.userDocumentService.getUserDocument(uid);

    if (!appUser) {
      throw new InvalidAccountError();
    }

    return appUser;
  }

  private isAllowedRedirect(redirectTo: string, role: UserRole): boolean {
    const normalized = redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
    return normalized.startsWith(`/${role}/`);
  }
}
