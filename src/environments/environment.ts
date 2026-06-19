import { FirebaseOptions } from '../app/firebase/firebase.options';

export const environment = {
  production: false,
  appName: 'SkillStart',
  githubPagesBaseHref: '/skillStart/',
  useHashRouting: true,
  // Firebase web config values are public client configuration.
  // Do not commit private admin credentials or server secrets.
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_FIREBASE_AUTH_DOMAIN',
    projectId: 'YOUR_FIREBASE_PROJECT_ID',
    storageBucket: 'YOUR_FIREBASE_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
    appId: 'YOUR_FIREBASE_APP_ID',
  } satisfies FirebaseOptions,
};
