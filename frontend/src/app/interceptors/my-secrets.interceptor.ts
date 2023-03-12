import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { SupabaseService } from '../supabase.service';

@Injectable()
export class MySecretsInterceptor implements HttpInterceptor {
  private token = `Bearer ${environment.supabaseKey}`;

  constructor(private supabaseSvc: SupabaseService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const headers = new HttpHeaders({
      Authorization: this.token
    })

    const headersClone = request.clone({headers})

    return next.handle(headersClone).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 200) {
          console.log('Petición enviada correctamente. Código 200!');
        }
      })
    );
  }
}
