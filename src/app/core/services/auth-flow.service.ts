import { Injectable, inject } from '@angular/core';
import { EmailAuthProvider, User, deleteUser, linkWithCredential } from 'firebase/auth';
import { Timestamp, writeBatch } from 'firebase/firestore';

import { AccountStatus, AppUser, CandidateProfile, CompanyProfile, ReviewStatus, UserRole } from '../../models';
import { FIREBASE_AUTH } from '../../firebase/firebase.tokens';
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

type RegistrationRole = 'candidate' | 'company';

@Injectable({ providedIn: 'root' })
export class AuthFlowService {
  private readonly auth = inject(FIREBASE_AUTH);
  private readonly authService = inject(AuthService);
  private readonly firestoreCollections = inject(FirestoreCollectionService);
  private readonly userDocumentService = inject(UserDocumentService);
  private readonly roleRedirectService = inject(RoleRedirectService);

  async prepareRegistrationSession(): Promise<void> {
    await this.authService.ensureAnonymousSession();
  }

  async registerCandidate(input: CandidateRegistrationInput): Promise<void> {
    const anonymousUser = await this.authService.ensureAnonymousSession();

    try {
      await this.createCandidateDraft(anonymousUser.uid, input);
      await this.linkAnonymousUserWithEmail(anonymousUser, input.email, input.password);
      await this.activateUserDocument(anonymousUser.uid, input.email);
    } catch (error) {
      await this.cleanupRegistrationDraft(anonymousUser, 'candidate');
      throw error;
    }
  }

  async registerCompany(input: CompanyRegistrationInput): Promise<void> {
    const anonymousUser = await this.authService.ensureAnonymousSession();

    try {
      await this.createCompanyDraft(anonymousUser.uid, input);
      await this.linkAnonymousUserWithEmail(anonymousUser, input.email, input.password);
      await this.activateUserDocument(anonymousUser.uid, input.email);
    } catch (error) {
      await this.cleanupRegistrationDraft(anonymousUser, 'company');
      throw error;
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

  private async createCandidateDraft(uid: string, input: CandidateRegistrationInput): Promise<void> {
    const now = Timestamp.now();
    const reviewStatus: ReviewStatus = 'draft';
    const userDocument = this.createPendingUserDocument(uid, input.email, 'candidate', now);
    const candidateProfile: CandidateProfile = {
      ownerId: uid,
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
    batch.set(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, uid), userDocument);
    batch.set(
      this.firestoreCollections.doc<CandidateProfile>(FIRESTORE_COLLECTIONS.candidateProfiles, uid),
      candidateProfile,
    );
    await batch.commit();
  }

  private async createCompanyDraft(uid: string, input: CompanyRegistrationInput): Promise<void> {
    const now = Timestamp.now();
    const reviewStatus: ReviewStatus = 'draft';
    const userDocument = this.createPendingUserDocument(uid, input.email, 'company', now);
    const companyProfile: CompanyProfile = {
      ownerId: uid,
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
    batch.set(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, uid), userDocument);
    batch.set(
      this.firestoreCollections.doc<CompanyProfile>(FIRESTORE_COLLECTIONS.companyProfiles, uid),
      companyProfile,
    );
    await batch.commit();
  }

  private createPendingUserDocument(
    uid: string,
    email: string,
    role: RegistrationRole,
    now: Timestamp,
  ): AppUser {
    const accountStatus: AccountStatus = 'pending';

    return {
      uid,
      email,
      role,
      accountStatus,
      createdAt: now,
      updatedAt: now,
    };
  }

  private async linkAnonymousUserWithEmail(user: User, email: string, password: string): Promise<void> {
    const credential = EmailAuthProvider.credential(email, password);
    await linkWithCredential(user, credential);
  }

  private async activateUserDocument(uid: string, email: string): Promise<void> {
    const now = Timestamp.now();
    const batch = writeBatch(this.firestoreCollections.firestore);
    batch.update(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, uid), {
      email,
      accountStatus: 'active',
      updatedAt: now,
    } satisfies Pick<AppUser, 'accountStatus' | 'email' | 'updatedAt'>);
    await batch.commit();
  }

  private async cleanupRegistrationDraft(user: User, role: RegistrationRole): Promise<void> {
    const batch = writeBatch(this.firestoreCollections.firestore);
    batch.delete(this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, user.uid));
    batch.delete(
      this.firestoreCollections.doc(
        role === 'candidate' ? FIRESTORE_COLLECTIONS.candidateProfiles : FIRESTORE_COLLECTIONS.companyProfiles,
        user.uid,
      ),
    );

    try {
      await batch.commit();
    } catch {
      // Keep the original registration error visible to the caller.
    }

    if (user.isAnonymous) {
      try {
        await deleteUser(user);
      } catch {
        // The next registration attempt can create a fresh anonymous user.
      }
    }
  }
}
