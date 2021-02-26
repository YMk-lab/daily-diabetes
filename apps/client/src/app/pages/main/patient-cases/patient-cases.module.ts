import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { PatientCasesComponent } from './components/patient-cases/patient-cases.component';
import { PatientCasesRoutingModule } from './patient-cases-routing.module';
import { AddNewCaseModalComponent } from './components/add-new-case-modal/add-new-case-modal.component';
import { CaseGroupComponent } from './components/case-group/case-group.component';
import { ActionsPanelComponent } from './components/actions-panel/actions-panel.component';


@NgModule({
  declarations: [
    PatientCasesComponent,
    AddNewCaseModalComponent,
    CaseGroupComponent,
    ActionsPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientCasesRoutingModule,
    TranslateModule,
    QuillModule.forRoot(),

    // DD shared modules
    MaterialSharedModule
  ]
})
export class PatientCasesModule { }
