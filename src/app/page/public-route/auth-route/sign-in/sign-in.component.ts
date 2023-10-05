import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('sign-in.component');

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInPage {
  @ViewChild('toggleCard', { static: false }) toggleCard!: ElementRef;
  isPageLoaded = true;
  isNavigatingToAnotherPage = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginLoading = false;
  isSignUpLoading = false;
  isSendVerifyEmail = false;
  toggleVerifyEmailDialog = false;
  toggleSuccessSignUpDialog = false;
  userEmail: string | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private auth: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isNavigatingToAnotherPage = true;
      } else if (event instanceof NavigationEnd) {
        this.isNavigatingToAnotherPage = false;
        this.isPageLoaded = true;
      }
    });

    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group({
      registerUserName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z0-9_]+$/),
        ],
      ],
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', [Validators.required, Validators.minLength(8)]],
      registerConfirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.matchPasswords.bind(this),
        ],
      ],
    });
  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.parent?.get('registerPassword');
    const confirmPassword = control.parent?.get('registerConfirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }

  toggle() {
    this.toggleCard.nativeElement.click();
  }

  redirectTo(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }

  async onLoginSubmit() {
    if (this.loginForm.valid) {
      this.auth.SetUserState(this.auth.getUserState);

      try {
        this.isLoginLoading = true;
        const email = this.loginForm.get('loginEmail')?.value;
        const password = this.loginForm.get('loginPassword')?.value;

        await this.auth
          .SignInWithEmailPassword(email, password)
          .then((invalid) => {
            if (invalid) {
              this.showErrorToast('Wrong Email or password.');
            } else {
              if (this.auth.isLoggedIn.emailVerified) {
                this.router.navigate(['/']);
              } else {
                this.userEmail = email;
                this.toggleVerifyEmailDialog = true;
              }
            }
          })
          .catch(() => {
            this.showErrorToast('Wrong Email or password.');
          });
      } catch (error) {
        log.error(error);
      } finally {
        this.isLoginLoading = false;
      }
    } else {
      if (this.loginForm.get('loginEmail')?.hasError('required')) {
        this.showErrorToast('Email is required.');
      }
      if (this.loginForm.get('loginEmail')?.hasError('email')) {
        this.showErrorToast('Invalid email format.');
      }
      if (this.loginForm.get('loginPassword')?.hasError('required')) {
        this.showErrorToast('Password is required.');
      }
      if (this.loginForm.get('loginPassword')?.errors?.['minlength']) {
        this.showErrorToast(
          'Your password must be a minimum of 8 characters long.',
        );
      }
    }
  }

  async onRegisterSubmit() {
    if (this.registerForm.valid) {
      try {
        this.isSignUpLoading = true;
        const email = this.registerForm.get('registerEmail')?.value;
        const password = this.registerForm.get('registerPassword')?.value;

        await this.auth
          .SignUp(email, password)
          .then((result) => {
            if (result && result.code === 'auth/email-already-in-use') {
              this.showErrorToast(
                'The email address is already in use by another account.',
              );
            } else if (result) {
              this.showErrorToast('Invalid email format.');
            } else {
              this.userEmail = email;
              this.auth.sendNewVerificationEmail;
              this.toggleSuccessSignUpDialog = true;
            }
          })
          .catch((error) => {
            log.error(error);
          });
      } catch (error) {
        log.error(error);
      } finally {
        this.isSignUpLoading = false;
      }
    } else {
      if (this.registerForm.get('registerUserName')?.hasError('required')) {
        this.showErrorToast('User name is required.');
      }
      if (this.registerForm.get('registerUserName')?.errors?.['minlength']) {
        this.showErrorToast(
          'Your User name must be a minimum of 2 characters long.',
        );
      }
      if (this.registerForm.get('registerUserName')?.hasError('pattern')) {
        this.showErrorToast('Special characters are not allowed.');
      }
      if (this.registerForm.get('registerEmail')?.hasError('required')) {
        this.showErrorToast('Email is required.');
      }
      if (this.registerForm.get('registerEmail')?.hasError('email')) {
        this.showErrorToast('Invalid email format.');
      }
      if (this.registerForm.get('registerPassword')?.errors?.['minlength']) {
        this.showErrorToast(
          'Your password must be a minimum of 8 characters long.',
        );
      }
      if (this.registerForm.get('registerPassword')?.hasError('required')) {
        this.showErrorToast('Password is required.');
      }
      if (
        this.registerForm.get('registerConfirmPassword')?.hasError('required')
      ) {
        this.showErrorToast('Confirm password is required.');
      }
      if (
        this.registerForm.get('registerConfirmPassword')?.errors?.['minlength']
      ) {
        this.showErrorToast(
          'Your confirm password must be a minimum of 8 characters long.',
        );
      }
      if (
        this.registerForm.get('registerConfirmPassword')?.errors?.[
          'passwordMismatch'
        ]
      ) {
        this.showErrorToast('Please make sure your passwords match.');
      }
    }
  }

  showErrorToast(massage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: massage,
    });
  }

  showSuccessToast(massage: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: massage,
    });
  }

  async getSendNewVerificationEmail() {
    this.isSendVerifyEmail = true;

    await this.auth
      .sendNewVerificationEmail()
      .then(() => {
        if (this.auth.isTooManyReqSendVerifyEmail === true) {
          this.isSendVerifyEmail = false;
          this.showErrorToast('Too many requests');
        } else {
          this.showSuccessToast('Send new verification email successful');
          this.isSendVerifyEmail = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeSuccessSignUpDialog() {
    this.toggleSuccessSignUpDialog = false;
    window.location.reload();
  }

  closeVerifyEmailDialog() {
    this.toggleVerifyEmailDialog = false;
  }
}
