import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { AccountStatus, AppUser, CandidateProfile, CompanyProfile, JobApplication, ReviewStatus, UserRole } from '../../models';
import { MockAuthError } from './mock-auth.error';

interface AuthAccountRecord {
  uid: string;
  email: string;
  password: string;
  role: UserRole;
  accountStatus: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

interface SessionUser {
  uid: string;
  email: string;
}

interface MockDatabaseState {
  authAccounts: Record<string, AuthAccountRecord>;
  users: Record<string, AppUser>;
  candidateProfiles: Record<string, CandidateProfile>;
  companyProfiles: Record<string, CompanyProfile>;
  applications: Record<string, JobApplication>;
}

interface CandidateRegistrationInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface CompanyRegistrationInput {
  email: string;
  password: string;
  companyName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
}

@Injectable({ providedIn: 'root' })
export class MockDatabaseService {
  private readonly databaseStorageKey = 'skillstart.mock.database';
  private readonly sessionStorageKey = 'skillstart.mock.session';
  private readonly state$ = new BehaviorSubject<MockDatabaseState | null>(null);
  private readonly session$ = new BehaviorSubject<SessionUser | null>(this.readSession());
  private initPromise: Promise<void> | null = null;

  get authState$(): Observable<SessionUser | null> {
    return this.session$.asObservable();
  }

  get currentSession(): SessionUser | null {
    return this.session$.value;
  }

  async registerCandidate(input: CandidateRegistrationInput): Promise<SessionUser> {
    return this.registerAccount('candidate', input);
  }

  async registerCompany(input: CompanyRegistrationInput): Promise<SessionUser> {
    return this.registerAccount('company', input);
  }

  async login(email: string, password: string): Promise<SessionUser> {
    const state = await this.getState();
    const account = Object.values(state.authAccounts).find(
      (candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (!account || account.password !== password) {
      throw new MockAuthError('auth/invalid-credential');
    }

    if (account.accountStatus !== 'active') {
      throw new MockAuthError('auth/user-disabled');
    }

    const session = { uid: account.uid, email: account.email };
    this.writeSession(session);
    return session;
  }

  async logout(): Promise<void> {
    this.writeSession(null);
  }

  async resetPassword(email: string): Promise<void> {
    if (!this.looksLikeEmail(email)) {
      throw new MockAuthError('auth/invalid-email');
    }
  }

  async getUser(uid: string): Promise<AppUser | null> {
    const state = await this.getState();
    return state.users[uid] ?? null;
  }

  watchUser(uid: string): Observable<AppUser | null> {
    return this.state$.pipe(map((state) => state?.users[uid] ?? null));
  }

  private async registerAccount(
    role: UserRole,
    input: CandidateRegistrationInput | CompanyRegistrationInput,
  ): Promise<SessionUser> {
    const email = input.email.trim().toLowerCase();

    if (!this.looksLikeEmail(email)) {
      throw new MockAuthError('auth/invalid-email');
    }

    if (input.password.length < 8) {
      throw new MockAuthError('auth/weak-password');
    }

    const state = await this.getState();
    const emailExists = Object.values(state.authAccounts).some(
      (account) => account.email.toLowerCase() === email,
    );

    if (emailExists) {
      throw new MockAuthError('auth/email-already-in-use');
    }

    const uid = this.createUid();
    const now = new Date().toISOString();
    const accountStatus: AccountStatus = 'active';
    const reviewStatus: ReviewStatus = 'draft';
    const user: AppUser = {
      uid,
      email,
      role,
      accountStatus,
      createdAt: now,
      updatedAt: now,
    };
    const account: AuthAccountRecord = {
      uid,
      email,
      password: input.password,
      role,
      accountStatus,
      createdAt: now,
      updatedAt: now,
    };

    state.authAccounts[uid] = account;
    state.users[uid] = user;

    if (role === 'candidate') {
      const candidateInput = input as CandidateRegistrationInput;
      state.candidateProfiles[uid] = {
        ownerId: uid,
        firstName: candidateInput.firstName,
        lastName: candidateInput.lastName,
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
    } else {
      const companyInput = input as CompanyRegistrationInput;
      state.companyProfiles[uid] = {
        ownerId: uid,
        companyName: companyInput.companyName,
        contactPersonFirstName: companyInput.contactPersonFirstName,
        contactPersonLastName: companyInput.contactPersonLastName,
        location: '',
        description: '',
        reviewStatus,
        createdAt: now,
        updatedAt: now,
      };
    }

    this.persistState(state);
    const session = { uid, email };
    this.writeSession(session);
    return session;
  }

  private async getState(): Promise<MockDatabaseState> {
    await this.ensureInitialized();
    return this.state$.value as MockDatabaseState;
  }

  private async ensureInitialized(): Promise<void> {
    if (this.state$.value) {
      return;
    }

    if (!this.initPromise) {
      this.initPromise = this.loadState();
    }

    await this.initPromise;
  }

  private async loadState(): Promise<void> {
    const stored = this.readStoredState();

    if (stored) {
      this.state$.next(stored);
      return;
    }

    const response = await fetch(new URL('mock-db.json', document.baseURI).toString());

    if (!response.ok) {
      throw new Error('Mock database seed could not be loaded.');
    }

    const seed = (await response.json()) as MockDatabaseState;
    const normalized = this.normalizeState(seed);
    this.persistState(normalized);
  }

  private normalizeState(state: Partial<MockDatabaseState>): MockDatabaseState {
    return {
      authAccounts: state.authAccounts ?? {},
      users: state.users ?? {},
      candidateProfiles: state.candidateProfiles ?? {},
      companyProfiles: state.companyProfiles ?? {},
      applications: state.applications ?? {},
    };
  }

  private persistState(state: MockDatabaseState): void {
    localStorage.setItem(this.databaseStorageKey, JSON.stringify(state));
    this.state$.next(state);
  }

  private readStoredState(): MockDatabaseState | null {
    const serialized = localStorage.getItem(this.databaseStorageKey);

    if (!serialized) {
      return null;
    }

    try {
      return this.normalizeState(JSON.parse(serialized) as Partial<MockDatabaseState>);
    } catch {
      localStorage.removeItem(this.databaseStorageKey);
      return null;
    }
  }

  private readSession(): SessionUser | null {
    const serialized = localStorage.getItem(this.sessionStorageKey);

    if (!serialized) {
      return null;
    }

    try {
      const session = JSON.parse(serialized) as SessionUser;
      return typeof session.uid === 'string' && typeof session.email === 'string' ? session : null;
    } catch {
      localStorage.removeItem(this.sessionStorageKey);
      return null;
    }
  }

  private writeSession(session: SessionUser | null): void {
    if (session) {
      localStorage.setItem(this.sessionStorageKey, JSON.stringify(session));
    } else {
      localStorage.removeItem(this.sessionStorageKey);
    }

    this.session$.next(session);
  }

  private looksLikeEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private createUid(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    return `mock-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}
