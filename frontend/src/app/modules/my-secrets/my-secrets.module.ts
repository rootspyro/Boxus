import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySecretsComponent } from './my-secrets.component';
import { MySecretsRoutingModule } from './my-secrets-routing.module';
import { SecretComponent } from 'src/app/components/secret/secret.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';

@NgModule({
  declarations: [MySecretsComponent],
  imports: [CommonModule, MySecretsRoutingModule, SecretComponent, SearchBarComponent],
})
export class MySecretsModule {}
