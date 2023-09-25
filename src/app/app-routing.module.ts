import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtGuard } from './guard/jwt.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page/secure-route/secure.module').then((m) => m.SecureModule),
    canActivate: [JwtGuard],
  },
  {
    path: 'public',
    loadChildren: () => import('./page/public-route/public.module').then((m) => m.PublicModule),
  },
  {
    path: '404',
    loadChildren: () => import('./page/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
