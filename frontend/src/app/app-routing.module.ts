import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'config',
    loadChildren: () =>
      import('./modules/config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./modules/messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'my-secrets',
    loadChildren: () =>
      import('./modules/my-secrets/my-secrets.module').then((m) => m.MySecretsModule),
  },
  {
    path: 'new-secret',
    loadChildren: () =>
      import('./modules/new-secret/new-secret.module').then((m) => m.NewSecretModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
