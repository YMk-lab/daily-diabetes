import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { patientProfileRoutes } from './routes';

@NgModule({
  imports: [RouterModule.forChild(patientProfileRoutes)],
  exports: [RouterModule]
})
export class PatientProfileRoutingModule { }
