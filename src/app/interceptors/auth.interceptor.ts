import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.accessToken).pipe(
      switchMap((accessToken) => {
        const authorizedRequest = req.clone({
          setHeaders: {
            "Content-Type": "application/json",
            "Authorization": accessToken ? accessToken : ''
          }
        })
        return next.handle(authorizedRequest);
      })
    );
  }
}
