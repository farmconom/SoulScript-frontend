import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurePage } from './secure.page';

const routes: Routes = [
  {
    path: '',
    component: SecurePage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard-route/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
