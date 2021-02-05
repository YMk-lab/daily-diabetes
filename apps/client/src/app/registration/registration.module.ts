import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PatientDiseaseInfoComponent } from './components/patient-disease-info/patient-disease-info.component';
import { PatientAddressInfoComponent } from './components/patient-address-info/patient-address-info.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    PatientInfoComponent,
    PatientDiseaseInfoComponent,
    PatientAddressInfoComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // DD library imports
    MaterialSharedModule
  ]
})
export class RegistrationModule { }
