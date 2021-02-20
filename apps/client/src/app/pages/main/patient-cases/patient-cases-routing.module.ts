import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { patientCasesRoutes } from './routes';

@NgModule({
  imports: [RouterModule.forChild(patientCasesRoutes)],
  exports: [RouterModule]
})
export class PatientCasesRoutingModule { }
