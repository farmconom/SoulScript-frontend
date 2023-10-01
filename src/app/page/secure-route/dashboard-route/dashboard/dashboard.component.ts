import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('collections.page');

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPage implements OnInit {
  isPageLoaded = false;
  isNavigatingToAnotherPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isNavigatingToAnotherPage = true;
      } else if (event instanceof NavigationEnd) {
        this.isNavigatingToAnotherPage = false;
        this.isPageLoaded = true;
      }
    });
  }

  ngOnInit(): void {
    log.info('main page');
  }
}
