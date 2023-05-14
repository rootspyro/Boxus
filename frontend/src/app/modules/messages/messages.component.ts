import { Component } from '@angular/core';
import { ChatDataSource } from './services/chats.datasource';
import { ChatsService } from './services/chats.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  chatDataSource: ChatDataSource;

  constructor(private chatsService: ChatsService) {
    this.chatDataSource = new ChatDataSource(chatsService);
  }
}
