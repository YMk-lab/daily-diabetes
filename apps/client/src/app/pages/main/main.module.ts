import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavStartComponent } from './dashboard/components/sidenav-start/sidenav-start.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavStartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,

    // DD library imports
    MaterialSharedModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
