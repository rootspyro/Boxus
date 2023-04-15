import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  { path: ':chatId', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
