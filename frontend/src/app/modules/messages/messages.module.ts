import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [MessagesComponent, ChatComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    // ScrollingModule,
    InfiniteScrollModule,
  ],
})
export class MessagesModule {}
