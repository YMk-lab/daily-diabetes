import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserAddressInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../../../services/auth.service';
import { PATIENT_ADDRESS_FORM } from './patient-address-form.params';

@Component({
  selector: 'dd-patient-address-info',
  templateUrl: './patient-address-info.component.html',
  styleUrls: ['./patient-address-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientAddressInfoComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      [PATIENT_ADDRESS_FORM.COUNTRY]: ['', Validators.required],
      [PATIENT_ADDRESS_FORM.CITY_OR_VILLAGE]: ['', Validators.required],
      [PATIENT_ADDRESS_FORM.ADDRESS]: ['', Validators.required],
      [PATIENT_ADDRESS_FORM.ZIP_CODE]: ['', Validators.required]
    });

    const formChangesSubscription = this.form.valueChanges.subscribe((changes: UserAddressInterface) => {
      this.authService.updatePatientAddressInfo(changes);
    });

    this.subscriptions.add(formChangesSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
