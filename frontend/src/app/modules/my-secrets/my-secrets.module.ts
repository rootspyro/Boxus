import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MySecretsComponent } from './my-secrets.component';
import { MySecretsRoutingModule } from './my-secrets-routing.module';
import { SecretComponent } from './../../components/secret/secret.component';
import { SearchBarComponent } from './../../components/search-bar/search-bar.component';

@NgModule({
  declarations: [MySecretsComponent],
  imports: [
    CommonModule,
    MySecretsRoutingModule,
    SecretComponent,
    SearchBarComponent,
    InfiniteScrollModule
  ],
})
export class MySecretsModule {}
