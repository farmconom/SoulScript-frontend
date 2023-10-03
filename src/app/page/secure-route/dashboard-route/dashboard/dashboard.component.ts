import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('collections.page');

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPage implements OnInit, AfterViewChecked {
  isPageLoaded = true;
  isNavigatingToAnotherPage = false;

  private hasLogged = false;

  constructor(
    private router: Router,
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
  }
  ngAfterViewChecked(): void {
    if (!this.hasLogged && this.auth.getUserState) {
      log.info('User State: ', this.auth.getUserState);
      this.hasLogged = true;
    }
  }

  ngOnInit(): void {
    log.debug('Log In Success');
  }

  logOut() {
    this.auth.SignOut();
  }
}
