import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MySecretsInterceptor implements HttpInterceptor {
  private token = this.authSvc.loggedUser.access_token;
  private fullToken = `Bearer ${this.token}`;

  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const headers = new HttpHeaders({
      Authorization: this.fullToken
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
