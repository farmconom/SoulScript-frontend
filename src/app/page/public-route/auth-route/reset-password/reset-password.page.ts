import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;
  isSubmit = false;
  isPageLoaded = true;
  isNavigatingToAnotherPage = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isNavigatingToAnotherPage = true;
      } else if (event instanceof NavigationEnd) {
        this.isNavigatingToAnotherPage = false;
        this.isPageLoaded = true;
      }
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: [
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
    const newPassword = control.parent?.get('newPassword');
    const confirmPassword = control.parent?.get('confirmNewPassword');

    if (
      newPassword &&
      confirmPassword &&
      newPassword.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.resetPasswordForm.valid) {
      // const email = this.resetPasswordForm.get('email').value;
      // Implement logic to send a password reset link to the provided email
      // You can use a service to make an HTTP request to your backend for this functionality
      // Example: this.authService.sendPasswordResetLink(email).subscribe(...)
    }
  }

  redirectTo(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }
}
