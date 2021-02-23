import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CaseInterface, UserInterface } from '@daily-diabetes/shared-data';

import { DateTimeFormatter } from '../../../../../classes/date-time-formatter';
import { CasesService } from '../../../../../services/cases/cases.service';
import { MealTypeInterface } from '../../interfaces/meal-type.interface';
import { CASE_MODAL_FORM_PARAMS } from './case-modal-form.params';


@Component({
  selector: 'dd-add-new-case-modal',
  templateUrl: './add-new-case-modal.component.html',
  styleUrls: ['./add-new-case-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewCaseModalComponent implements OnInit, OnDestroy {

  form: FormGroup;

  patientProfile: UserInterface;
  currentDay = new Date();
  editorConfig = {
    toolbar: [
      [{ list: 'ordered' }],
      ['bold', 'italic', 'underline']
    ]
  }
  mealTypeChipList: MealTypeInterface[] = [
    {
      label: 'PATIENT_CASES.CASE_MODAL.MEAL_TYPE.VALUES.BREAKFAST',
      value: 'breakfast'
    },
    {
      label: 'PATIENT_CASES.CASE_MODAL.MEAL_TYPE.VALUES.DINNER',
      value: 'dinner'
    },
    {
      label: 'PATIENT_CASES.CASE_MODAL.MEAL_TYPE.VALUES.SUPPER',
      value: 'supper'
    },
    {
      label: 'PATIENT_CASES.CASE_MODAL.MEAL_TYPE.VALUES.SNACK',
      value: 'snack'
    }
  ];
  indicationTypes: string[] = ['mmol/L', 'mg/dL'];

  private addNewCaseModal: any;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private modalData: { patientProfile: UserInterface },
    private modal: MatDialog,
    private fb: FormBuilder,
    private casesService: CasesService
  ) { }

  ngOnInit(): void {
    this.addNewCaseModal = this.modal.getDialogById('add-new-cases-modal');
    this.patientProfile = this.modalData.patientProfile;

    this.form = this.fb.group({
      [CASE_MODAL_FORM_PARAMS.CURRENT_DAY]: [{ value: this.currentDay, disabled: true }],
      [CASE_MODAL_FORM_PARAMS.CURRENT_TIME]: [DateTimeFormatter.formatTime(new Date())],
      [CASE_MODAL_FORM_PARAMS.SHORT_INSULIN]: [0],
      [CASE_MODAL_FORM_PARAMS.BASE_INSULIN]: [0],
      [CASE_MODAL_FORM_PARAMS.MEAL_TYPE]: [''],
      [CASE_MODAL_FORM_PARAMS.MEAL_DESCRIPTION]: [''],
      [CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION]: ['0.0'],
      [CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION_TYPE]: ['mmol/L']
    });
  }

  selectMealType(mealType: any) {
    this.form.controls.mealType.setValue(mealType.value);
  }

  close(): void {
    this.addNewCaseModal.close();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const newCase = this.form.value as CaseInterface;
    newCase.currentDay = this.currentDay;
    newCase.userId = this.patientProfile.uuid;

    this.casesService.create(newCase)
      .subscribe((createdCase: CaseInterface) => this.addNewCaseModal.close(createdCase));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
