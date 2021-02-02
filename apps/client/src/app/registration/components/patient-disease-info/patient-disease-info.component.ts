import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'dd-patient-disease-info',
  templateUrl: './patient-disease-info.component.html',
  styleUrls: ['./patient-disease-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientDiseaseInfoComponent implements OnInit, OnDestroy {

  form: FormGroup;

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName: []
    });

    const formChangesSubscription = this.form.valueChanges.subscribe((changes: any) => {
      console.log('PatientInfo:Form: ', changes);
    });

    this.subscriptions.add(formChangesSubscription);

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
