import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { SkipAuthGuard } from './guards/skip-auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginModule),
    canActivate: [ SkipAuthGuard ]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module')
      .then(m => m.RegistrationModule),
    canActivate: [ SkipAuthGuard ]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module')
      .then(m => m.MainModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];
