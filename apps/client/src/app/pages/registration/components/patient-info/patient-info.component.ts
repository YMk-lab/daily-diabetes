import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../../../../services/auth/auth.service';
import { ComparePasswordsValidator } from '../../validators/compare-passwords.validator';
import { PATIENT_INFO_FORM } from './patient-info-form.params';

@Component({
  selector: 'dd-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientInfoComponent implements OnInit, OnDestroy {

  form: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      [PATIENT_INFO_FORM.FIRST_NAME]: ['', Validators.required],
      [PATIENT_INFO_FORM.LAST_NAME]: ['', Validators.required],
      [PATIENT_INFO_FORM.BIRTH_DATE]: ['', Validators.required],
      [PATIENT_INFO_FORM.PHONE]: ['', Validators.required],
      [PATIENT_INFO_FORM.EMAIL]: ['', [Validators.required, Validators.email] ],
      [PATIENT_INFO_FORM.PASSWORD]: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)]
      ],
      [PATIENT_INFO_FORM.CONFIRM_PASSWORD]: ['', Validators.required]
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
