import { Injectable, inject } from '@angular/core';
import { User, onAuthStateChanged } from 'firebase/auth';
import { Observable, firstValueFrom, shareReplay } from 'rxjs';

import { FIREBASE_AUTH } from '../../firebase/firebase.tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(FIREBASE_AUTH);

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
}
