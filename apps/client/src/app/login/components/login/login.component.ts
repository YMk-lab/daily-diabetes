import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LOGIN_FORM_PARAMS } from './login-form.params';

@Component({
  selector: 'dd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) { }

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

    console.log(this.loginForm.value);
  }
}
