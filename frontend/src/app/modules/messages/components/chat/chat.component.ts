import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  ngSendMsg(event: Event) {
    event.preventDefault()
    console.log(event.target)
  }
}
