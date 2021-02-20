import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthTokensInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../services/auth/auth.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { HttpStatusesEnum } from '../enums/http-statuses.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private lsService: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.lsService.get('access-token');

    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${ accessToken }` }
      });
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

      if (error.status === HttpStatusesEnum.UNAUTHORIZED) {

        return this.authService.refreshToken().pipe(
          switchMap((tokens: AuthTokensInterface) => {

          if (tokens && tokens.accessToken) {
            this.lsService.set('access-token', tokens.accessToken);

            request = request.clone({
              setHeaders: { Authorization: `Bearer ${ tokens.accessToken }` }
            });

            return next.handle(request);
          }

        }),
          catchError((refreshTokenError: HttpErrorResponse) => {

            if (error.status === HttpStatusesEnum.UNAUTHORIZED || error.status === HttpStatusesEnum.FORBIDDEN) {
              return this.authService.logout();
            }

            return throwError(refreshTokenError);
          })
        );

      }

      return throwError(error);
    }))
  }
}
