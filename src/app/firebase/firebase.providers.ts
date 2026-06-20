import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { FirebaseOptions } from './firebase.options';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_FIRESTORE } from './firebase.tokens';

export function provideSkillStartFirebase(config: FirebaseOptions): EnvironmentProviders {
  const firebaseApp = getOrCreateFirebaseApp(config);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return makeEnvironmentProviders([
    { provide: FIREBASE_APP, useValue: firebaseApp },
    { provide: FIREBASE_AUTH, useValue: auth },
    { provide: FIREBASE_FIRESTORE, useValue: firestore },
  ]);
}

function getOrCreateFirebaseApp(config: FirebaseOptions): FirebaseApp {
  return getApps().length > 0 ? getApp() : initializeApp(config);
}
