import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExamplesRouting } from './test-examples.routing';
import { FirstAppPhotosComponent } from './components/first-app-photos/first-app-photos.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    FirstAppPhotosComponent
  ],
  imports: [
    CommonModule,
    TestExamplesRouting,
    IonicModule
  ]
})
export class TestExamplesModule { }
