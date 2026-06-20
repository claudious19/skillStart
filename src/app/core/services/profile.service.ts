import { Injectable, inject } from '@angular/core';
import { DocumentData, getDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { CandidateProfile, Company } from '../../models';
import { FirestoreCollectionService } from './firestore-collection.service';

export interface CandidateProfileUpdate {
  careerGoals: string;
  location: string;
  apprenticeshipProfession: string;
  skills: string[];
  specialisation: string;
}

export interface CompanyUpdate {
  description: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
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

  async getCompany(companyId: string): Promise<Company | null> {
    const snapshot = await getDoc(
      this.firestoreCollections.doc<Company & DocumentData>(
        FIRESTORE_COLLECTIONS.companies,
        companyId,
      ),
    );

    return snapshot.exists() ? (snapshot.data() as Company) : null;
  }

  updateCandidateProfile(uid: string, update: CandidateProfileUpdate): Promise<void> {
    return updateDoc(
      this.firestoreCollections.doc<CandidateProfile & DocumentData>(
        FIRESTORE_COLLECTIONS.candidateProfiles,
        uid,
      ),
      {
        ...update,
        updatedAt: new Date(),
      },
    );
  }

  updateCompany(companyId: string, update: CompanyUpdate): Promise<void> {
    return updateDoc(
      this.firestoreCollections.doc<Company & DocumentData>(
        FIRESTORE_COLLECTIONS.companies,
        companyId,
      ),
      {
        ...update,
        updatedAt: new Date(),
      },
    );
  }
}
