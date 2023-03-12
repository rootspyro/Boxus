import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySecretsComponent } from './my-secrets.component';
import { MySecretsRoutingModule } from './my-secrets-routing.module';
import { SecretComponent } from 'src/app/components/secret/secret.component';

@NgModule({
  declarations: [MySecretsComponent],
  imports: [CommonModule, MySecretsRoutingModule, SecretComponent],
})
export class MySecretsModule {}
