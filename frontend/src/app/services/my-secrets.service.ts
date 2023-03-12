import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class MySecretsService {
  private mySecretsSubject = new BehaviorSubject<any>([]);
  mySecrets$ = this.mySecretsSubject.asObservable()

  constructor(private httpClient: HttpClient) {
    this.getSecrets();
  }

  getSecrets(): any {
    return this.httpClient
      .get(environment.supabaseEndpoint)
      .pipe(tap(data => this.mySecretsSubject.next(data)))
      .subscribe();
  }
}
