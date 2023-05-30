import { Component, OnDestroy } from '@angular/core';
import { ChatsService } from './services/chats.service';
import { ChatData } from './models/Chat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnDestroy {
  private offset: number = 0;
  chatItems$: Observable<ChatData[]>;

  constructor(private chatsService: ChatsService) {
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
