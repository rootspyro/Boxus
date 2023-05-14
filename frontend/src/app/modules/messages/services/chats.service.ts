import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Chat } from '../models/Chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private chatsBehaviorSubject$ = new BehaviorSubject<Chat[]>([]);
  private chats$: Observable<Chat[]> = this.chatsBehaviorSubject$.asObservable();

  constructor(private httpClient: HttpClient) {
    httpClient
      .get<Chat[]>(environment.supabaseEndpointChats)
      .pipe(tap((chats) => this.chatsBehaviorSubject$.next(chats)));
  }

  get getAllChats(): Observable<Chat[]> {
    return this.chats$;
  }
}
