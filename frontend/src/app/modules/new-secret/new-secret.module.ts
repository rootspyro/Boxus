import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSecretComponent } from './new-secret.component';
import { NewSecretRoutingModule } from './new-secret-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewSecretComponent],
  imports: [CommonModule, NewSecretRoutingModule, ReactiveFormsModule],
})
export class NewSecretModule {}
