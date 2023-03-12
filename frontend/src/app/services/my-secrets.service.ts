import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MySecretsService {
  private mySecretsSubject = new BehaviorSubject<any>([]);
  mySecrets$ = this.mySecretsSubject.asObservable()

  constructor(private httpClient: HttpClient) {
    this.getSecrets();
  }

  getSecrets(): any {
    return this.httpClient
      .get('https://tqoqrsdndvoemfyybxlg.functions.supabase.co/secrets')
      .pipe(tap(data => this.mySecretsSubject.next(data)))
      .subscribe();
  }
}
