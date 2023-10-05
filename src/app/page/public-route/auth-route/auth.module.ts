import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './sign-in/sign-in.component';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [SignInPage, ForgotPasswordPage],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
  ],
  providers: [MessageService],
})
export class AuthModule {}
