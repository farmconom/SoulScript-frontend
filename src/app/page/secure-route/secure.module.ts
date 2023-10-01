import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { SecurePage } from './secure.page';

@NgModule({
  declarations: [SecurePage],
  imports: [CommonModule, SecureRoutingModule],
})
export class SecureModule {}
