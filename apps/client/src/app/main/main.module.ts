import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidenavStartComponent } from './components/sidenav-start/sidenav-start.component';
import { SidenavEndComponent } from './components/sidenav-end/sidenav-end.component';


@NgModule({
  declarations: [
    MainComponent,
    SidenavStartComponent,
    SidenavEndComponent
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
