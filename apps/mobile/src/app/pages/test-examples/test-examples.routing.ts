import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstAppPhotosComponent } from './components/first-app-photos/first-app-photos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'first-app-photos',
    pathMatch: 'full'
  },
  {
    path: 'first-app-photos',
    component: FirstAppPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestExamplesRouting { }
