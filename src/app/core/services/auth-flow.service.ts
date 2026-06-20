import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
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
    const credential = await createUserWithEmailAndPassword(this.auth, input.email, input.password);

    try {
      const now = Timestamp.now();
      const reviewStatus: ReviewStatus = 'draft';
      const accountStatus: AccountStatus = 'active';
      const userDocument: AppUser = {
        uid: credential.user.uid,
        email: credential.user.email ?? input.email,
        role: 'candidate',
        accountStatus,
        createdAt: now,
        updatedAt: now,
      };
      const candidateProfile: CandidateProfile = {
        ownerId: credential.user.uid,
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
      batch.set(
        this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, credential.user.uid),
        userDocument,
      );
      batch.set(
        this.firestoreCollections.doc<CandidateProfile>(
          FIRESTORE_COLLECTIONS.candidateProfiles,
          credential.user.uid,
        ),
        candidateProfile,
      );
      await batch.commit();
    } catch (error) {
      await deleteUser(credential.user);
      throw error;
    }
  }

  async registerCompany(input: CompanyRegistrationInput): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, input.email, input.password);

    try {
      const now = Timestamp.now();
      const reviewStatus: ReviewStatus = 'draft';
      const accountStatus: AccountStatus = 'active';
      const userDocument: AppUser = {
        uid: credential.user.uid,
        email: credential.user.email ?? input.email,
        role: 'company',
        accountStatus,
        createdAt: now,
        updatedAt: now,
      };
      const companyProfile: CompanyProfile = {
        ownerId: credential.user.uid,
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
      batch.set(
        this.firestoreCollections.doc<AppUser>(FIRESTORE_COLLECTIONS.users, credential.user.uid),
        userDocument,
      );
      batch.set(
        this.firestoreCollections.doc<CompanyProfile>(
          FIRESTORE_COLLECTIONS.companyProfiles,
          credential.user.uid,
        ),
        companyProfile,
      );
      await batch.commit();
    } catch (error) {
      await deleteUser(credential.user);
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
}
