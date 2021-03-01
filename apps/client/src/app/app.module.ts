import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpLocalizationLoader } from './classes/http-localization-loader';
import { HttpErrorsHandlerInterceptor } from './interceptors/http-errors-handler.interceptor';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { currentLocale } from './helpers/locale-factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLocalizationLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      maxOpened: 5,
      preventDuplicates: true,

    })
  ],
  providers: [
    { provide: 'Window',  useValue: window },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsHandlerInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: currentLocale,
      deps: [LocalStorageService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
