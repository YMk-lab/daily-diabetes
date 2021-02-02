import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { registrationRoutes } from './routes';

@NgModule({
  imports: [RouterModule.forChild(registrationRoutes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
