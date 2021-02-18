import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialSharedModule } from '@daily-diabetes/material-shared';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { SidenavStartComponent } from './components/sidenav-start/sidenav-start.component';
import { ProfileModalComponent } from './components/main/components/profile-modal/profile-modal.component';
import { GeneralInfoTabComponent } from './components/main/components/profile-modal/tabs/general-info-tab/general-info-tab.component';


@NgModule({
  declarations: [
    MainComponent,
    SidenavStartComponent,
    ProfileModalComponent,
    GeneralInfoTabComponent
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
