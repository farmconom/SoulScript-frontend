import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService]
})
export class SignInPage {
  @ViewChild('toggleCard', { static: false }) toggleCard!: ElementRef;
  isPageLoaded = false;
  isNavigatingToAnotherPage = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
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
      registerUserName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', [Validators.required, Validators.minLength(8)]],
      registerConfirmPassword: ['', [Validators.required, Validators.minLength(8), this.matchPasswords.bind(this)]],
    });
  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.parent?.get('registerPassword');
    const confirmPassword = control.parent?.get('registerConfirmPassword');

    if (password && confirmPassword && (password.value !== confirmPassword.value)) {
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

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
      // const email = this.forgotPasswordForm.get('email').value;

      // Implement logic to send a password reset link to the provided email
      // You can use a service to make an HTTP request to your backend for this functionality
      // Example: this.authService.sendPasswordResetLink(email).subscribe(...)
    } else {
      if (this.loginForm.get('loginEmail')?.hasError('required')) {
        this.showToast('Email is required.');
      }
      if (this.loginForm.get('loginEmail')?.hasError('email')) {
        this.showToast('Invalid email format.');
      }
      if (this.loginForm.get('loginPassword')?.hasError('required')) {
        this.showToast('Password is required.');
      }
      if (this.loginForm.get('loginPassword')?.errors?.['minlength']) {
        this.showToast('Your password must be a minimum of 8 characters long.');
      }
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.router.navigate(['/']);
      // const email = this.forgotPasswordForm.get('email').value;

      // Implement logic to send a password reset link to the provided email
      // You can use a service to make an HTTP request to your backend for this functionality
      // Example: this.authService.sendPasswordResetLink(email).subscribe(...)
    } else {
      if (this.registerForm.get('registerUserName')?.hasError('required')) {
        this.showToast('User name is required.');
      }
      if (this.registerForm.get('registerUserName')?.errors?.['minlength']) {
        this.showToast('Your User name must be a minimum of 2 characters long.');
      }
      if (this.registerForm.get('registerUserName')?.hasError('pattern')) {
        this.showToast('Special characters are not allowed.');
      }
      if (this.registerForm.get('registerEmail')?.hasError('required')) {
        this.showToast('Email is required.');
      }
      if (this.registerForm.get('registerEmail')?.hasError('email')) {
        this.showToast('Invalid email format.');
      }
      if (this.registerForm.get('registerPassword')?.errors?.['minlength']) {
        this.showToast('Your password must be a minimum of 8 characters long.');
      }
      if (this.registerForm.get('registerPassword')?.hasError('required')) {
        this.showToast('Password is required.');
      }
      if (this.registerForm.get('registerConfirmPassword')?.hasError('required')) {
        this.showToast('Confirm password is required.');
      }
      if (this.registerForm.get('registerConfirmPassword')?.errors?.['minlength']) {
        this.showToast('Your confirm password must be a minimum of 8 characters long.');
      }
      if (this.registerForm.get('registerConfirmPassword')?.errors?.['passwordMismatch']) {
        this.showToast('Please make sure your passwords match.');
      }
    }
  }

  showToast(massage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: massage,
    });
  }
}
