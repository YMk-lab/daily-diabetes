import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserDiseaseInfoInterface } from '@daily-diabetes/shared-data';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'dd-patient-disease-info',
  templateUrl: './patient-disease-info.component.html',
  styleUrls: ['./patient-disease-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientDiseaseInfoComponent implements OnInit, OnDestroy {

  form: FormGroup;

  diabetesTypes: string[] = [
    '1st type of diabetes',
    '2st type of diabetes',
  ];
  illPeriodUnits: string[] = [
    'month',
    'year (\'s)'
  ];

  get illPeriodFormGroup(): FormGroup {
    return this.form.controls.illPeriod as FormGroup;
  }

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      diabetesType: ['', Validators.required],
      illPeriod: this.fb.group({
        time:       ['', Validators.required],
        timeUnit:   ['', Validators.required]
      }),
      shortInsulin: ['', Validators.required],
      baseInsulin:  ['', Validators.required]
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
