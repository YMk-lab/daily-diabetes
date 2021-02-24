import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { fromEvent, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from './services/auth/auth.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject('Window') private window: Window,
    private translateService: TranslateService,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    this.translateService.addLangs(['uk', 'en']);
    this.translateService.setDefaultLang('uk');

    this.protectTokens();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private protectTokens(): void {
    const lsSubscription = fromEvent(this.window, 'storage').pipe(switchMap((lsChanges: any) => {

      const accessToken = lsChanges.key === 'access-token';
      const refreshTokenID = lsChanges.key === 'refresh-token-id';

      if (accessToken && !refreshTokenID) {
        return this.authService.logout(this.lsService.get('refresh-token-id'));
      }

      if (refreshTokenID && lsChanges.newValue === null) {
        return this.authService.logout(JSON.parse(lsChanges.oldValue));
      }

      return of();

    })).subscribe(() => {

      this.toasterService.warning(
        this.translateService.instant('APP.SAFETY_ERROR_MESSAGE'),
        this.translateService.instant('APP.SAFETY_ERROR_TITLE'), {
        timeOut: 10000,
        closeButton: true,
        extendedTimeOut: 3000,
        progressAnimation: 'decreasing',
        progressBar: true,
        newestOnTop: true
      });

    });

    this.subscriptions.add(lsSubscription);
  }
}
