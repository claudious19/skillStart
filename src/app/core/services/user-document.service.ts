import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentSnapshot, getDoc, onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { AccountStatus } from '../../models/account-status.type';
import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { FirestoreCollectionService } from './firestore-collection.service';
import { AppUser } from '../../models/app-user.model';
import { UserRole } from '../../models/user-role.type';

const VALID_USER_ROLES: UserRole[] = ['candidate', 'company', 'admin'];
const VALID_ACCOUNT_STATUSES: AccountStatus[] = ['active', 'pending'];

@Injectable({ providedIn: 'root' })
export class UserDocumentService {
  private readonly firestoreCollections = inject(FirestoreCollectionService);

  async getUserDocument(uid: string): Promise<AppUser | null> {
    const snapshot = await getDoc(
      this.firestoreCollections.doc<AppUser & DocumentData>(FIRESTORE_COLLECTIONS.users, uid),
    );
    return this.mapUserDocument(snapshot);
  }

  watchUserDocument(uid: string): Observable<AppUser | null> {
    return new Observable<AppUser | null>((subscriber) => {
      const unsubscribe = onSnapshot(
        this.firestoreCollections.doc<AppUser & DocumentData>(FIRESTORE_COLLECTIONS.users, uid),
        (snapshot) => subscriber.next(this.mapUserDocument(snapshot)),
        (error) => subscriber.error(error),
      );

      return unsubscribe;
    });
  }

  private mapUserDocument(snapshot: DocumentSnapshot<DocumentData>): AppUser | null {
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    if (!this.isValidAppUserData(data)) {
      return null;
    }

    return {
      uid: snapshot.id,
      email: data['email'],
      role: data['role'],
      companyId: typeof data['companyId'] === 'string' ? data['companyId'] : null,
      CompanyDisplayname:
        typeof data['CompanyDisplayname'] === 'string' ? data['CompanyDisplayname'] : null,
      displayName: typeof data['displayName'] === 'string' ? data['displayName'] : data['email'],
      firstName: typeof data['firstName'] === 'string' ? data['firstName'] : undefined,
      lastName: typeof data['lastName'] === 'string' ? data['lastName'] : undefined,
      accountStatus: data['accountStatus'],
      createdAt: data['createdAt'],
      updatedAt: data['updatedAt'],
    };
  }

  private isValidAppUserData(data: DocumentData): data is Omit<AppUser, 'uid'> {
    return (
      typeof data['email'] === 'string' &&
      VALID_USER_ROLES.includes(data['role'] as UserRole) &&
      VALID_ACCOUNT_STATUSES.includes(data['accountStatus'] as AccountStatus) &&
      typeof data['createdAt'] === 'object' &&
      typeof data['updatedAt'] === 'object'
    );
  }
}
