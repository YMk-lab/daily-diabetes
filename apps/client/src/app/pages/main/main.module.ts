import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    TranslateModule
  ]
})
export class MainModule { }
