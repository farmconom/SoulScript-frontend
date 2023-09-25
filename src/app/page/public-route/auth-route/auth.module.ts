import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPage } from './sign-in/sign-in.component';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignInPage,
    ForgotPasswordPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
