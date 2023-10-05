import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('forgot-password.page');
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  isPageLoaded = true;
  isNavigatingToAnotherPage = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService,
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
      this.isLoading = true;
      this.auth
        .ForgotPassword(this.forgotPasswordForm.get('email')?.value)
        .then((result) => {
          if (result && result.code) {
            log.error(result);
            if (result.code === 'auth/invalid-email') {
              this.showErrorToast('The email address is badly formatted.');
            } else {
              this.showErrorToast('Too many requests.');
            }
          } else {
            this.showSuccessToast(result);
          }
          this.isLoading = false;
        });
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

  redirectTo(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }
}
