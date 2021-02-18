import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserDiseaseInfoInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../../../services/auth/auth.service';
import { PATIENT_DISEASE_FORM } from './patient-disease-form.params';

@Component({
  selector: 'dd-patient-disease-info',
  templateUrl: './patient-disease-info.component.html',
  styleUrls: ['./patient-disease-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientDiseaseInfoComponent implements OnInit, OnDestroy {

  form: FormGroup;

  diabetesTypes: string[] = [
    'PATIENT_DISEASE.FORM.DIABETES_TYPE_CONTROL.TYPE_ONE',
    'PATIENT_DISEASE.FORM.DIABETES_TYPE_CONTROL.TYPE_TWO',
  ];
  illPeriodUnits: string[] = [
    'PATIENT_DISEASE.FORM.ILL_TIME_UNIT_CONTROL.TYPE_MONTH',
    'PATIENT_DISEASE.FORM.ILL_TIME_UNIT_CONTROL.TYPE_YEARS'
  ];

  get illPeriodFormGroup(): FormGroup {
    return this.form.controls.illPeriod as FormGroup;
  }

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      [PATIENT_DISEASE_FORM.DIABETES_TYPE]: ['', Validators.required],
      [PATIENT_DISEASE_FORM.ILL_PERIOD]: this.fb.group({
        [PATIENT_DISEASE_FORM.TIME]: ['', Validators.required],
        [PATIENT_DISEASE_FORM.TIME_UNIT]: ['', Validators.required]
      }),
      [PATIENT_DISEASE_FORM.SHORT_INSULIN]: ['', Validators.required],
      [PATIENT_DISEASE_FORM.BASE_INSULIN]: ['', Validators.required]
    });

    const formChangesSubscription = this.form.valueChanges.subscribe((changes: UserDiseaseInfoInterface) => {
      this.authService.updatePatientDiseaseInfo(changes);
    });

    this.subscriptions.add(formChangesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
