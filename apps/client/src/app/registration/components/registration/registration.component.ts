import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { PatientInfoComponent } from '../patient-info/patient-info.component';
import { PatientDiseaseInfoComponent } from '../patient-disease-info/patient-disease-info.component';

;

@Component({
  selector: 'dd-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  @ViewChild(PatientInfoComponent, { static: true })
  patientInfoForm: PatientInfoComponent;

  @ViewChild(PatientDiseaseInfoComponent, { static: true })
  patientDiseaseForm: PatientDiseaseInfoComponent;

  constructor() { }

  ngOnInit(): void {

  }

}
