import { Injectable } from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { catchError } from 'rxjs/operators';
import { HttpStatusesEnum } from '../enums/http-statuses.enum';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class HttpErrorsHandlerInterceptor implements HttpInterceptor {

  constructor(
    private toasterService: ToastrService,
    private translateService: TranslateService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case HttpStatusesEnum.BAD_REQUEST:
          this.getErrorNotification(
            this.translateService.instant(`${ error.error.title }`),
            this.translateService.instant(`${ error.error.error }`)
          );
          break;

        case HttpStatusesEnum.UNAUTHORIZED:

          if (error.error && (!error.error.title && !error.error.error)) {
            return throwError(error);
          }

          this.getErrorNotification(
            this.translateService.instant(`${ error.error.title }`),
            this.translateService.instant(`${ error.error.error }`)
          );

          break;

        case HttpStatusesEnum.FORBIDDEN:
          this.getErrorNotification(
            this.translateService.instant(`${ error.error.title }`),
            this.translateService.instant(`${ error.error.error }`)
          );
          break;

        case HttpStatusesEnum.NOT_FOUND:
          this.getErrorNotification(
            this.translateService.instant('APP.ERRORS.NOT_FOUND.TITLE'),
            this.translateService.instant('APP.ERRORS.NOT_FOUND.TEXT'),
          );
          break;

        case HttpStatusesEnum.CONFLICT:
          this.getErrorNotification(
            this.translateService.instant(`${ error.error.title }`),
            this.translateService.instant(`${ error.error.error }`)
          );
          break;

        case HttpStatusesEnum.SERVER_ERROR:
          this.getErrorNotification(
            this.translateService.instant('APP.ERRORS.SERVER.TITLE'),
            this.translateService.instant('APP.ERRORS.SERVER.TEXT')
          );
          break;

        default:
          this.getErrorNotification(
            this.translateService.instant('APP.ERRORS.UNDEFINED.TITLE'),
            this.translateService.instant('APP.ERRORS.UNDEFINED.TEXT')
          );
          break;
      }

      return throwError(error);
    }));
  }

  private getErrorNotification(title: string, text: string): void {

    this.toasterService.error(text, title, {
      timeOut: 6000,
      closeButton: true,
      extendedTimeOut: 3000,
      progressAnimation: 'decreasing',
      progressBar: true,
      newestOnTop: true
    })
  }
}
