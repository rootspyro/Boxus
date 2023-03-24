import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { fullSecret, Secret } from '../interfaces/secret';

@Injectable({ providedIn: 'root' })
export class MySecretsService {
  private mySecretsSubject = new BehaviorSubject<any>([]);
  private mySecrets$ = this.mySecretsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getSecrets();
  }

  private getSecrets(): void {
    this.httpClient
      .get(environment.supabaseEndpoint)
      .pipe(tap((data) => this.mySecretsSubject.next(data)))
      .subscribe();
  }

  get allSecrets(): Observable<fullSecret[]> {
    return this.mySecrets$;
  }

  postSecret(secret: Secret): void {
    this.httpClient
      .post(environment.supabaseEndpoint, secret)
      .subscribe((res) => console.log(res));

    this.getSecrets();
  }
}
