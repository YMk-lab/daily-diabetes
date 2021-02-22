import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DateTimeFormatter } from '../../../../../classes/date-time-formatter';
import { CASE_MODAL_FORM_PARAMS } from './case-modal-form.params';

@Component({
  selector: 'dd-add-new-case-modal',
  templateUrl: './add-new-case-modal.component.html',
  styleUrls: ['./add-new-case-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewCaseModalComponent implements OnInit, OnDestroy {

  form: FormGroup;

  currentDay = new Date();
  editorConfig = {
    toolbar: [
      [{ list: 'ordered' }],
      ['bold', 'italic', 'underline']
    ]
  }
  mealTypeChipList: any[] = [
    {
      label: 'Breakfast',
      value: 'breakfast'
    },
    {
      label: 'Dinner',
      value: 'dinner'
    },
    {
      label: 'Supper',
      value: 'supper'
    },
    {
      label: 'Snack',
      value: 'snack'
    }
  ];
  indicationTypes: string[] = ['mmol/L', 'mg/dL'];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private modal: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      [CASE_MODAL_FORM_PARAMS.CURRENT_DAY]: [{ value: this.currentDay, disabled: true }],
      [CASE_MODAL_FORM_PARAMS.CURRENT_TIME]: [DateTimeFormatter.formatTime(new Date())],
      [CASE_MODAL_FORM_PARAMS.SHORT_INSULIN]: [],
      [CASE_MODAL_FORM_PARAMS.BASE_INSULIN]: [],
      [CASE_MODAL_FORM_PARAMS.MEAL_TYPE]: [],
      [CASE_MODAL_FORM_PARAMS.MEAL_DESCRIPTION]: [''],
      [CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION]: [],
      [CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION_TYPE]: ['mmol/L']
    });

    const formSubscription = this.form.valueChanges.subscribe((changes: any) => {
      console.log(changes);
    });
    this.subscriptions.add(formSubscription);
  }

  selectMealType(mealType: any) {
    this.form.controls.mealType.setValue(mealType.value);
  }

  close(): void {
    this.modal.getDialogById('add-new-case-modal').close();
  }

  save(): void {
    console.log('ADD new case...');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
