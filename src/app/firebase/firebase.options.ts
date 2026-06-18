import { FirebaseOptions as FirebaseSdkOptions } from 'firebase/app';

export type FirebaseOptions = Pick<
  FirebaseSdkOptions,
  'apiKey' | 'appId' | 'authDomain' | 'messagingSenderId' | 'projectId' | 'storageBucket'
>;
