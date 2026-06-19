import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentSnapshot, getDoc, onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { FIRESTORE_COLLECTIONS } from '../../firebase/firestore.collections';
import { FirestoreCollectionService } from './firestore-collection.service';
import { AppUser } from '../../models/app-user.model';

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

    return {
      uid: snapshot.id,
      ...(snapshot.data() as Omit<AppUser, 'uid'>),
    };
  }
}
