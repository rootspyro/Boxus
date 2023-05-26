import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { FullSecret, Secret } from '../interfaces/secret';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MySecretsService {
  private mySecretsSubject$ = new BehaviorSubject<FullSecret[]>([]);

  constructor(private httpClient: HttpClient) {}

  private getAllSecrets(offset: number): Observable<FullSecret[]> {
    return this.httpClient.get<FullSecret[]>(
      `${environment.supabaseEndpoint}?offset=${offset}`
    );
  }

  get secrets$(): Observable<FullSecret[]> {
    return this.mySecretsSubject$.asObservable();
  }

  set updateSecrets(offset: number) {
    this.getAllSecrets(offset)
      .pipe(
        take(1),
        tap((newSecrets) => {
          const updatedSecrets = [
            ...this.mySecretsSubject$.getValue(),
            ...newSecrets,
          ];
          this.mySecretsSubject$.next(updatedSecrets);
        })
      )
      .subscribe();
  }

  clearSecrets(): void {
    this.mySecretsSubject$.complete();
    this.mySecretsSubject$ = new BehaviorSubject<FullSecret[]>([]);
  }

  postSecret(secret: Secret): void {
    this.httpClient.post(environment.supabaseEndpoint, secret);
  }
}
