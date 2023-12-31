import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './sign-in/sign-in.component';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [SignInPage, ForgotPasswordPage, ResetPasswordPage],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, ToastModule],
})
export class AuthModule {}
