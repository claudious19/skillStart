import { Injectable, inject } from '@angular/core';
import {
  browserLocalPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import { Observable, firstValueFrom, shareReplay } from 'rxjs';

import { FIREBASE_AUTH } from '../../firebase/firebase.tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(FIREBASE_AUTH);
  private readonly persistenceReady = setPersistence(this.auth, browserLocalPersistence);

  readonly authState$: Observable<User | null> = new Observable<User | null>((subscriber) => {
    const unsubscribe = onAuthStateChanged(
      this.auth,
      (user) => subscriber.next(user),
      (error) => subscriber.error(error),
    );

    return unsubscribe;
  }).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  waitForAuthState(): Promise<User | null> {
    return firstValueFrom(this.authState$);
  }

  async login(email: string, password: string): Promise<User> {
    await this.persistenceReady;
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    return credential.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }
}
