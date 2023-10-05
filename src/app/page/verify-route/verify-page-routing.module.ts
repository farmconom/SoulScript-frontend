import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyPageComponent } from './verify-page.component';

const routes: Routes = [
  { path: '', component: VerifyPageComponent },
  { path: 'reset-password', component: ResetPasswordPage },
  { path: 'verify-email', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyPageRoutingModule {}
