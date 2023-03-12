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

@Injectable()
export class MySecretsInterceptor implements HttpInterceptor {
  private token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxb3Fyc2RuZHZvZW1meXlieGxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1ODI3MDgsImV4cCI6MTk5NDE1ODcwOH0.0FMOme8085djxnX9PocaDtoy7jkZHllFMwRtrndYpx0'

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
