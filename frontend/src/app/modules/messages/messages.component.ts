import { Component } from '@angular/core';
import { ChatDataSource } from './services/chats.datasource';
import { ChatsService } from './services/chats.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  dataSource: ChatDataSource;

  constructor(private chatsService: ChatsService) {
    this.dataSource = new ChatDataSource(this.chatsService);
  }
}
