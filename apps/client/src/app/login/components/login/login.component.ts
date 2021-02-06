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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      [LOGIN_FORM_PARAMS.EMAIL]:    ['', Validators.required, Validators.pattern('')],
      [LOGIN_FORM_PARAMS.PASSWORD]: ['', Validators.required]
    });
  }

}
