import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [MessagesComponent, ChatComponent],
  imports: [CommonModule, MessagesRoutingModule],
})
export class MessagesModule {}
