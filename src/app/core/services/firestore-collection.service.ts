import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, collection, doc } from 'firebase/firestore';

import { FirestoreCollectionName } from '../../firebase/firestore.collections';
import { FIREBASE_FIRESTORE } from '../../firebase/firebase.tokens';

@Injectable({ providedIn: 'root' })
export class FirestoreCollectionService {
  private readonly firestore = inject(FIREBASE_FIRESTORE);

  collection<T extends DocumentData>(collectionName: FirestoreCollectionName): CollectionReference<T> {
    return collection(this.firestore, collectionName) as CollectionReference<T>;
  }

  doc<T extends DocumentData>(
    collectionName: FirestoreCollectionName,
    documentId: string,
  ): DocumentReference<T> {
    return doc(this.firestore, collectionName, documentId) as DocumentReference<T>;
  }
}
