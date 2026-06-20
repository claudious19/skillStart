import { Injectable, inject } from '@angular/core';
import { DocumentData, getDoc, updateDoc, Timestamp } from 'firebase/firestore';

import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { CandidateProfile, CompanyProfile } from '../../models';
import { FirestoreCollectionService } from './firestore-collection.service';

export interface CandidateProfileUpdate {
  apprenticeshipProfession: string;
  specialisation: string;
  skills: string[];
  location: string;
  careerGoals: string;
}

export interface CompanyProfileUpdate {
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
      {
        ...update,
        updatedAt: Timestamp.now(),
      },
    );
  }
}
