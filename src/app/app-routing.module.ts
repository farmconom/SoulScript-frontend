import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedIn } from './guard/loggedIn.guard';
import { NoLoggedIn } from './guard/noLoggedIn.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./page/secure-route/secure.module').then((m) => m.SecureModule),
    canActivate: [LoggedIn],
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./page/public-route/public.module').then((m) => m.PublicModule),
    canActivate: [NoLoggedIn],
  },
  {
    path: 'action',
    loadChildren: () =>
      import('./page/verify-route/verify-page.module').then(
        (m) => m.VerifyPageModule,
      ),
    canActivate: [NoLoggedIn],
  },
  {
    path: '404',
    loadChildren: () =>
      import('./page/not-found-page/not-found-page.module').then(
        (m) => m.NotFoundPageModule,
      ),
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
