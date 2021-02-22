import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { PatientCasesComponent } from './components/patient-cases/patient-cases.component';
import { PatientCasesRoutingModule } from './patient-cases-routing.module';
import { EmptyCasesListComponent } from './components/empty-cases-list/empty-cases-list.component';
import { AddNewCaseModalComponent } from './components/add-new-case-modal/add-new-case-modal.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    PatientCasesComponent,
    EmptyCasesListComponent,
    AddNewCaseModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientCasesRoutingModule,
    QuillModule.forRoot(),

    // DD shared modules
    MaterialSharedModule
  ]
})
export class PatientCasesModule { }
