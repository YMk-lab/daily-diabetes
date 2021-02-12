import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [LOGIN_FORM_PARAMS.EMAIL]:    ['', [Validators.required, Validators.email]],
      [LOGIN_FORM_PARAMS.PASSWORD]: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginSubscription = this.authService.login(this.loginForm.value).subscribe((response: any) => {
      console.log(response);
    });

    this.subscriptions.add(loginSubscription);
  }

  ngOnDestroy(): void {
  }
}
