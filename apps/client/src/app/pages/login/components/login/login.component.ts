import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { forkJoin, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthTokensInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../../../../services/auth/auth.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';
import { LOGIN_FORM_PARAMS } from './login-form.params';


@Component({
  selector: 'dd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hidePassword = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [LOGIN_FORM_PARAMS.EMAIL_OR_PHONE]:    ['', [Validators.required]],
      [LOGIN_FORM_PARAMS.PASSWORD]: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginSubscription = this.authService.login(this.loginForm.value).pipe(
      switchMap((tokens: AuthTokensInterface) => this.storeTokens(tokens))
    ).subscribe((_: unknown) => this.router.navigate(['/dashboard']));

    this.subscriptions.add(loginSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private storeTokens(tokens: AuthTokensInterface): Observable<unknown> {
    return forkJoin([
      this.lsService.set('access-token', tokens.accessToken),
      this.lsService.set('refresh-token-id', tokens.refreshTokenID)
    ]);
  }
}
