import {
  ChangeDetectorRef, Component, OnInit,
  ViewChild, ViewEncapsulation
} from '@angular/core';

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
export class RegistrationComponent implements OnInit {

  @ViewChild(PatientInfoComponent, { static: true })
  patientInfoCmp: PatientInfoComponent;

  @ViewChild(PatientAddressInfoComponent, { static: true })
  patientAddressCmp: PatientAddressInfoComponent;

  @ViewChild(PatientDiseaseInfoComponent, { static: true })
  patientDiseaseCmp: PatientDiseaseInfoComponent;

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.cdr.detectChanges();

    this.authService.patient$.subscribe((patient) => console.log(patient));
  }

  submit(): void {

    console.log('Submit');

  }
}
