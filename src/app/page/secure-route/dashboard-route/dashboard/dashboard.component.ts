import { Component, OnInit } from '@angular/core';
import { Logger } from 'src/app/utility/logger';

const log = new Logger('collections.page');

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPage implements OnInit {
  ngOnInit(): void {
    log.info('main page');
  }
}
