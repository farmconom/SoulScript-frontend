import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
