import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserAddressInterface } from '@daily-diabetes/shared-data';

import { AuthService } from '../../../services/auth.service';

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
      country:        ['', Validators.required],
      cityOrVillage:  ['', Validators.required],
      address:        ['', Validators.required],
      postalZipCode:  ['', Validators.required]
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
