import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySecretsComponent } from './my-secrets.component';

const routes: Routes = [{ path: '', component: MySecretsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySecretsRoutingModule {}
