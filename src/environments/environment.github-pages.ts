import { FirebaseOptions } from '../app/firebase/firebase.options';

export const environment = {
  production: true,
  appName: 'SkillStart',
  githubPagesBaseHref: '/skillStart/',
  useHashRouting: true,
  // Firebase web config values are public client configuration.
  // Do not commit private admin credentials or server secrets.
  firebase: {
    apiKey: 'AIzaSyC5UzCdxAlKfLjpAyyvxl4X6hyTIQcFZj0',
    authDomain: 'skillstart-5c65b.firebaseapp.com',
    projectId: 'skillstart-5c65b',
    storageBucket: 'skillstart-5c65b.firebasestorage.app',
    messagingSenderId: '371054682779',
    appId: '1:371054682779:web:d913011890069bd8251c3e',
    measurementId: 'G-QFYLTELP07',
  } satisfies FirebaseOptions,
};
