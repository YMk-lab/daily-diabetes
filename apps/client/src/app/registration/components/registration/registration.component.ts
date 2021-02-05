import {
  ChangeDetectorRef, Component, OnDestroy, OnInit,
  ViewChild, ViewEncapsulation
} from '@angular/core';

import { Subscription } from 'rxjs';

import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PatientAddressInfoComponent } from '../patient-address-info/patient-address-info.component';
import { PatientDiseaseInfoComponent } from '../patient-disease-info/patient-disease-info.component';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'dd-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit, OnDestroy {

  @ViewChild(PatientInfoComponent, { static: true })
  patientInfoCmp: PatientInfoComponent;

  @ViewChild(PatientAddressInfoComponent, { static: true })
  patientAddressCmp: PatientAddressInfoComponent;

  @ViewChild(PatientDiseaseInfoComponent, { static: true })
  patientDiseaseCmp: PatientDiseaseInfoComponent;

  private subscriptions: Subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  submit(): void {

    const patientSubscription = this.authService.patient$
      .subscribe((patient) => this.authService.submit(patient));

    this.subscriptions.add(patientSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
