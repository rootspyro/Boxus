import { Component, OnDestroy } from '@angular/core';
// import { ChatDataSource } from './services/chats.datasource';
import { ChatsService } from './services/chats.service';
import { ChatData } from './models/Chat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnDestroy {
  // dataSource: ChatDataSource;
  chatItems$: Observable<ChatData[]>;
  private offset: number = 0;

  constructor(private chatsService: ChatsService) {
    // this.dataSource = new ChatDataSource(this.chatsService);
    chatsService.updateChats = this.offset;
    this.chatItems$ = chatsService.chats$;
  }

  onScrolledMessages(): void {
    this.offset++
    this.chatsService.updateChats = this.offset * 10;
  }

  ngOnDestroy(): void {
    this.chatsService.clearChatsList();
  }
}
