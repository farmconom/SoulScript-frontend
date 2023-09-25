import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit{
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) {
      this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }

  ngOnInit() {
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      // const email = this.forgotPasswordForm.get('email').value;

      // Implement logic to send a password reset link to the provided email
      // You can use a service to make an HTTP request to your backend for this functionality
      // Example: this.authService.sendPasswordResetLink(email).subscribe(...)
    }
  }

  redirectTo(url: string) {
    if(url) {
      this.router.navigate([url]);
    }
  }
}
