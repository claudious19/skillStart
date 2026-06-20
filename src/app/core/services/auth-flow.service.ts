import { Injectable, inject } from '@angular/core';
import { EmailAuthProvider, User, deleteUser, linkWithCredential } from 'firebase/auth';
import { Timestamp, writeBatch } from 'firebase/firestore';

import { AccountStatus, AppUser, CandidateProfile, CompanyProfile, ReviewStatus, UserRole } from '../../models';
import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { FirestoreCollectionService } from './firestore-collection.service';
import { RoleRedirectService } from './role-redirect.service';
import { UserDocumentService } from './user-document.service';
import { AuthService } from './auth.service';

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

export class InactiveAccountError extends Error {
  constructor() {
    super('The authenticated account is not active yet.');
  }
}

@Injectable({ providedIn: 'root' })
export class AuthFlowService {
  private readonly authService = inject(AuthService);
  private readonly firestoreCollections = inject(FirestoreCollectionService);
  private readonly userDocumentService = inject(UserDocumentService);
  private readonly roleRedirectService = inject(RoleRedirectService);

  async prepareRegistrationSession(): Promise<void> {
    await this.authService.ensureAnonymousSession();
  }

  async registerCandidate(input: CandidateRegistrationInput): Promise<void> {
    const anonymousUser = await this.requireAnonymousUser();

    try {
      await this.createCandidateDraft(anonymousUser, input);
      await this.linkAnonymousUser(anonymousUser, input.email, input.password);
      await this.activateUserDocument(anonymousUser.uid, input.email);
    } catch (error) {
      await this.cleanupFailedRegistration(anonymousUser, error);
    }
  }

  async registerCompany(input: CompanyRegistrationInput): Promise<void> {
    const anonymousUser = await this.requireAnonymousUser();

    try {
      await this.createCompanyDraft(anonymousUser, input);
      await this.linkAnonymousUser(anonymousUser, input.email, input.password);
      await this.activateUserDocument(anonymousUser.uid, input.email);
    } catch (error) {
      await this.cleanupFailedRegistration(anonymousUser, error);
    }
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
    const appUser = await this.requireActiveAppUser(uid);

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

  private async requireAnonymousUser(): Promise<User> {
    const user = await this.authService.ensureAnonymousSession();

    if (!user.isAnonymous) {
      throw new Error('Registration requires an anonymous session.');
    }

    return user;
  }

  private async createCandidateDraft(user: User, input: CandidateRegistrationInput): Promise<void> {
    const now = Timestamp.now();
    const accountStatus: AccountStatus = 'pending';
    const reviewStatus: ReviewStatus = 'draft';

    const userDocument: AppUser = {
      uid: user.uid,
      email: input.email,
      role: 'candidate',
      accountStatus,
      createdAt: now,
      updatedAt: now,
    };

    const candidateProfile: CandidateProfile = {
      ownerId: user.uid,
      firstName: input.firstName,
      lastName: input.lastName,
      apprenticeshipProfession: '',
      specialisation: '',
      graduationYear: new Date().getFullYear(),
      skills: [],
      personalProjects: [],
      certificates: [],
      location: '',
      careerGoals: '',
      desiredProfessionalFields: [],
      reviewStatus,
      createdAt: now,
      updatedAt: now,
    };

    const batch = writeBatch(this.firestoreCollections.firestore);
    batch.set(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, user.uid), userDocument);
    batch.set(
      this.firestoreCollections.doc<CandidateProfile>(FIRESTORE_COLLECTIONS.candidateProfiles, user.uid),
      candidateProfile,
    );

    await batch.commit();
  }

  private async createCompanyDraft(user: User, input: CompanyRegistrationInput): Promise<void> {
    const now = Timestamp.now();
    const accountStatus: AccountStatus = 'pending';
    const reviewStatus: ReviewStatus = 'draft';

    const userDocument: AppUser = {
      uid: user.uid,
      email: input.email,
      role: 'company',
      accountStatus,
      createdAt: now,
      updatedAt: now,
    };

    const companyProfile: CompanyProfile = {
      ownerId: user.uid,
      companyName: input.companyName,
      contactPersonFirstName: input.contactPersonFirstName,
      contactPersonLastName: input.contactPersonLastName,
      location: '',
      description: '',
      reviewStatus,
      createdAt: now,
      updatedAt: now,
    };

    const batch = writeBatch(this.firestoreCollections.firestore);
    batch.set(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, user.uid), userDocument);
    batch.set(
      this.firestoreCollections.doc<CompanyProfile>(FIRESTORE_COLLECTIONS.companyProfiles, user.uid),
      companyProfile,
    );

    await batch.commit();
  }

  private async linkAnonymousUser(user: User, email: string, password: string): Promise<void> {
    const credential = EmailAuthProvider.credential(email, password);
    const linkedCredential = await linkWithCredential(user, credential);

    await linkedCredential.user.getIdToken(true);
  }

  private async activateUserDocument(uid: string, email: string): Promise<void> {
    const now = Timestamp.now();

    const batch = writeBatch(this.firestoreCollections.firestore);
    batch.update(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, uid), {
      email,
      accountStatus: 'active',
      updatedAt: now,
    } satisfies Pick<AppUser, 'email' | 'accountStatus' | 'updatedAt'>);

    await batch.commit();
  }

  private async cleanupFailedRegistration(user: User, error: unknown): Promise<never> {
    try {
      await this.deleteOwnedRegistrationDocuments(user.uid);
    } finally {
      try {
        await deleteUser(user);
      } catch {
        // Ignore cleanup failures and preserve the original registration error.
      }
    }

    throw error;
  }

  private async deleteOwnedRegistrationDocuments(uid: string): Promise<void> {
    const batch = writeBatch(this.firestoreCollections.firestore);
    batch.delete(this.firestoreCollections.doc(FIRESTORE_COLLECTIONS.users, uid));
    batch.delete(this.firestoreCollections.doc(FIRESTORE_COLLECTIONS.candidateProfiles, uid));
    batch.delete(this.firestoreCollections.doc(FIRESTORE_COLLECTIONS.companyProfiles, uid));
    await batch.commit();
  }

  private async requireValidAppUser(uid: string): Promise<AppUser> {
    const appUser = await this.userDocumentService.getUserDocument(uid);

    if (!appUser) {
      throw new InvalidAccountError();
    }

    return appUser;
  }

  private async requireActiveAppUser(uid: string): Promise<AppUser> {
    const appUser = await this.requireValidAppUser(uid);

    if (appUser.accountStatus !== 'active') {
      throw new InactiveAccountError();
    }

    return appUser;
  }

  private isAllowedRedirect(redirectTo: string, role: UserRole): boolean {
    const normalized = redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
    return normalized.startsWith(`/${role}/`);
  }
}
