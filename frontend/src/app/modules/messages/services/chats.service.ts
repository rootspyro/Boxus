import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { ChatData } from '../models/Chat';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private chatsBehaviorSubject$ = new BehaviorSubject<ChatData[]>([]);

  constructor(
    private httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  private getAllChats(offset: number): Observable<ChatData[]> {
    return this.httpClient.get<ChatData[]>(
      `${environment.supabaseEndpointChats}/?id=${this.authService.loggedUser.user.id}&offset=${offset}`
    );
  }

  get chats$(): Observable<ChatData[]> {
    return this.chatsBehaviorSubject$.asObservable();
  }

  set updateChats(offset: number) {
    this.getAllChats(offset)
      .pipe(
        take(1),
        tap((chats) => {
          const updatedChats = [
            ...this.chatsBehaviorSubject$.getValue(),
            ...chats,
          ];
          this.chatsBehaviorSubject$.next(updatedChats);
        })
      )
      .subscribe();
  }

  /**
   * This method complete the behavior subject and create a new behavior subject with empty data
   */
  clearChatsList(): void {
    this.chatsBehaviorSubject$.complete();
    this.chatsBehaviorSubject$ = new BehaviorSubject<ChatData[]>([]);
  }
}
