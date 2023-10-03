import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
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

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.router.navigate(['public/auth/reset-password']);
      // const email = this.forgotPasswordForm.get('email').value;

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
