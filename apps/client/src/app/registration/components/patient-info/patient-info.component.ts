import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../../../services/auth.service';
import { ComparePasswordsValidator } from '../../validators/compare-passwords.validator';

@Component({
  selector: 'dd-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientInfoComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName:        ['', Validators.required],
      lastName:         ['', Validators.required],
      birthDate:        ['', Validators.required],
      phone:            ['', Validators.required],
      email:            ['', [
        Validators.required,
        Validators.email
      ] ],
      password:         ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)]
      ],
      confirmPassword:  ['', Validators.required]
    }, { validators: ComparePasswordsValidator.compare() });

    const formChangesSubscription = this.form.valueChanges.subscribe((changes: UserInterface) => {
      this.authService.updatePatientInfo(changes);
    });

    this.subscriptions.add(formChangesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
