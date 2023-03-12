import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySecretsComponent } from './my-secrets.component';
import { MySecretsRoutingModule } from './my-secrets-routing.module';

@NgModule({
  declarations: [MySecretsComponent],
  imports: [CommonModule, MySecretsRoutingModule],
})
export class MySecretsModule {}
