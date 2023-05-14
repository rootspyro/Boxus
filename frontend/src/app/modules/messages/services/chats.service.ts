import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatData } from '../models/Chat';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getAllChats(offset: number): Observable<ChatData[]> {
    return this.httpClient.get<ChatData[]>(
      `${environment.supabaseEndpointChats}/?id=${this.authService.loggedUser.user.id}?offset=${offset}`
    );
  }
}
