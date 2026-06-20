import { Injectable, inject } from '@angular/core';
<<<<<<< HEAD
import { DocumentData, Timestamp, getDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { CandidateProfile, Company } from '../../models';
=======
import { DocumentData, getDoc, updateDoc, Timestamp } from 'firebase/firestore';

import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { CandidateProfile, CompanyProfile } from '../../models';
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
import { FirestoreCollectionService } from './firestore-collection.service';

export interface CandidateProfileUpdate {
  apprenticeshipProfession: string;
  specialisation: string;
  skills: string[];
  location: string;
  careerGoals: string;
}

<<<<<<< HEAD
export interface CompanyUpdate {
=======
export interface CompanyProfileUpdate {
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
  description: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly firestoreCollections = inject(FirestoreCollectionService);

  async getCandidateProfile(uid: string): Promise<CandidateProfile | null> {
    const snapshot = await getDoc(
      this.firestoreCollections.doc<CandidateProfile & DocumentData>(
        FIRESTORE_COLLECTIONS.candidateProfiles,
        uid,
      ),
    );

    return snapshot.exists() ? (snapshot.data() as CandidateProfile) : null;
  }

  async updateCandidateProfile(uid: string, update: CandidateProfileUpdate): Promise<void> {
    await updateDoc(
      this.firestoreCollections.doc<CandidateProfile & DocumentData>(
        FIRESTORE_COLLECTIONS.candidateProfiles,
        uid,
      ),
      {
        ...update,
        updatedAt: Timestamp.now(),
      },
    );
  }

<<<<<<< HEAD
  async getCompany(companyId: string): Promise<Company | null> {
    const snapshot = await getDoc(
      this.firestoreCollections.doc<Company & DocumentData>(FIRESTORE_COLLECTIONS.companies, companyId),
    );

    return snapshot.exists() ? (snapshot.data() as Company) : null;
  }

  async updateCompany(companyId: string, update: CompanyUpdate): Promise<void> {
    await updateDoc(
      this.firestoreCollections.doc<Company & DocumentData>(FIRESTORE_COLLECTIONS.companies, companyId),
=======
  async getCompanyProfile(uid: string): Promise<CompanyProfile | null> {
    const snapshot = await getDoc(
      this.firestoreCollections.doc<CompanyProfile & DocumentData>(
        FIRESTORE_COLLECTIONS.companyProfiles,
        uid,
      ),
    );

    return snapshot.exists() ? (snapshot.data() as CompanyProfile) : null;
  }

  async updateCompanyProfile(uid: string, update: CompanyProfileUpdate): Promise<void> {
    await updateDoc(
      this.firestoreCollections.doc<CompanyProfile & DocumentData>(
        FIRESTORE_COLLECTIONS.companyProfiles,
        uid,
      ),
>>>>>>> 57582642ea4c8b9f9155c08f24ab5aa638fae960
      {
        ...update,
        updatedAt: Timestamp.now(),
      },
    );
  }
}
