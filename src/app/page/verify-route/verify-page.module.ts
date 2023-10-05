import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyPageRoutingModule } from './verify-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { VerifyPageComponent } from './verify-page.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ResetPasswordPage, VerifyEmailComponent, VerifyPageComponent],
  imports: [
    CommonModule,
    VerifyPageRoutingModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class VerifyPageModule {}
