import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSecretComponent } from './new-secret.component';

const routes: Routes = [{ path: '', component: NewSecretComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSecretRoutingModule {}
