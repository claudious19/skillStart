import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentSnapshot, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { AppUser } from '../../models/app-user.model';
import { FIREBASE_FIRESTORE } from '../../firebase/firebase.tokens';

@Injectable({ providedIn: 'root' })
export class UserDocumentService {
  private readonly firestore = inject(FIREBASE_FIRESTORE);

  async getUserDocument(uid: string): Promise<AppUser | null> {
    const snapshot = await getDoc(doc(this.firestore, 'users', uid));
    return this.mapUserDocument(snapshot);
  }

  watchUserDocument(uid: string): Observable<AppUser | null> {
    return new Observable<AppUser | null>((subscriber) => {
      const unsubscribe = onSnapshot(
        doc(this.firestore, 'users', uid),
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
