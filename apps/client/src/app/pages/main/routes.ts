import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'patient-cases',
        loadChildren: () => import('./patient-cases/patient-cases.module')
          .then(m => m.PatientCasesModule)
      },
      {
        path: 'patient-profile',
        loadChildren: () => import('./patient-profile/patient-profile.module')
          .then(m => m.PatientProfileModule)
      },
      {
        path: '',
        redirectTo: 'patient-cases',
        pathMatch: 'full'
      }
    ]
  }
];
