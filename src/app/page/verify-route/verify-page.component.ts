import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
})
export class VerifyPageComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    const mode = this.activatedRoute.snapshot.queryParams['mode'];
    const oobCode = this.activatedRoute.snapshot.queryParams['oobCode'];
    const apiKey = this.activatedRoute.snapshot.queryParams['apiKey'];
    const lang = this.activatedRoute.snapshot.queryParams['lang'];

    if (mode === 'resetPassword') {
      this.redirectTo('/action/reset-password', {
        queryParams: { mode, oobCode, apiKey, lang },
      });
    } else if (mode === 'verifyEmail') {
      this.redirectTo('/action/verify-email', {
        queryParams: { mode, oobCode, apiKey, lang },
      });
    } else {
      this.redirectTo('/');
    }
  }

  redirectTo(url: string, options?: NavigationExtras) {
    if (url) {
      this.router.navigate([url], options);
    }
  }
}
