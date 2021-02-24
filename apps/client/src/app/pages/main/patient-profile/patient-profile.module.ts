import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { PatientProfileRoutingModule } from './patient-profile-routing.module';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientProfileEditComponent } from './components/patient-profile-edit/patient-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientProfileComponent,
    PatientProfileEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientProfileRoutingModule,

    // DD shared modules
    // DD library imports
    MaterialSharedModule,
    TranslateModule
  ]
})
export class PatientProfileModule { }
