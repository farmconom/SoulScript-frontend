import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Logger } from '../utility/logger';

const log = new Logger('auth.service');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState: firebase.default.User | null = null;
  isTooManyReqSendVerifyEmail = false;

  constructor(
    private firebaseAuth: AngularFireAuth, // Inject Firebase auth service
    private firebase: AngularFirestore, // Inject Firestore service
    private router: Router,
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
      } else {
        this.userState = null;
        localStorage.setItem('user', JSON.stringify(null));
      }
    });
  }

  async SignUp(email: string, password: string) {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserState(result.user);
      })
      .catch((error) => {
        return error;
      });
  }

  async SignInWithEmailPassword(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserState(result.user);
        this.firebaseAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        return error;
      });
  }

  async SendVerificationMail() {
    try {
      const currentUser = await this.firebaseAuth.currentUser;

      if (currentUser) {
        await currentUser.sendEmailVerification();
        // this.router.navigate(['verify-email-address']);
      } else {
        log.debug('User not found.');
      }
    } catch (error) {
      log.error('Error sending email verification:', error);
    }
  }

  async ForgotPassword(passwordResetEmail: string) {
    return this.firebaseAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get getUserState() {
    return this.userState;
  }

  get isLoggedIn() {
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : undefined;
    return {
      loggedIn: !!userJSON && userJSON !== 'null' ? true : false,
      emailVerified: user ? user.emailVerified : false,
    };
  }

  SetUserState(user: firebase.default.User | null) {
    const userRef: AngularFirestoreDocument<User> = this.firebase.doc(
      `users/${user?.uid}`,
    );
    const userData: User = {
      uid: user?.uid || null,
      email: user?.email || null,
      displayName: user?.displayName || null,
      photoURL: user?.photoURL || null,
      emailVerified: user?.emailVerified || false,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async sendNewVerificationEmail() {
    try {
      const user = await this.firebaseAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
      } else {
        log.debug('User is null.');
      }
    } catch (error) {
      this.isTooManyReqSendVerifyEmail = true;
    }
  }

  async SignOut() {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/public']);
    });
  }
}
