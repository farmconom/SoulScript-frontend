import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('verify-email.component');

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  isPageLoaded = true;
  isNavigatingToAnotherPage = false;
  oobCode: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
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
  }

  async ngOnInit(): Promise<void> {
    await this.onVerifyEmail();
  }

  async onVerifyEmail() {
    if (this.oobCode) {
      await this.auth.verifyEmail(this.oobCode);
    }
  }
  redirectTo(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }
}
