import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'test-examples',
    loadChildren: () => import('./pages/test-examples/test-examples.module')
      .then((m) => m.TestExamplesModule)
  },
  {
    path: '',
    redirectTo: 'test-examples',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
