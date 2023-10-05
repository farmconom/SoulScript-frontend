import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('reset-password.page');

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
  oobCode: string | undefined;
  toggleDialog = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private messageService: MessageService,
  ) {
    const mode = this.activatedRoute.snapshot.queryParams['mode'];
    const oobCode = this.activatedRoute.snapshot.queryParams['oobCode'];
    const apiKey = this.activatedRoute.snapshot.queryParams['apiKey'];
    const lang = this.activatedRoute.snapshot.queryParams['lang'];
    log.debug({
      mode: mode,
      oobCode: oobCode,
      apiKey: apiKey,
      lang: lang,
    });

    this.oobCode = oobCode;

    if (!mode) {
      this.redirectTo('/');
    }

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

  async onSubmit() {
    this.isSubmit = true;
    if (this.resetPasswordForm.valid && this.oobCode) {
      await this.auth
        .confirmPasswordReset(
          this.oobCode,
          this.resetPasswordForm.get('newPassword')?.value,
        )
        .then((result) => {
          if (result === 'Success') {
            this.toggleDialog = true;
          } else {
            if (result.code === 'auth/expired-action-code') {
              this.showErrorToast('Reset password request has expired.');
            } else {
              this.showErrorToast(result);
            }
          }
        });
    }
  }

  redirectTo(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }

  showErrorToast(massage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: massage,
    });
  }

  closeDialog() {
    this.toggleDialog = false;
    this.redirectTo('/');
  }
}
