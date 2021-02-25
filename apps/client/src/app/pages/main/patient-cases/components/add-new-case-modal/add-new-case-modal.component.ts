import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as moment from 'moment';

import { Subscription } from 'rxjs';

import { CaseInterface, UserInterface } from '@daily-diabetes/shared-data';

import { CasesService } from '../../../../../services/cases/cases.service';
import { MealTypeInterface } from '../../interfaces/meal-type.interface';
import { IndicationTypeEnum } from '../../enums/indication-type.enum';
import { LocalStorageService } from '../../../../../services/local-storage/local-storage.service';
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
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
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
  baseInsulinStateChecked: boolean;

  private addNewCaseModal: any;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private modalData: { patientProfile: UserInterface },
    private modal: MatDialog,
    private fb: FormBuilder,
    private casesService: CasesService,
    private lsService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.addNewCaseModal = this.modal.getDialogById('add-new-cases-modal');
    this.patientProfile = this.modalData.patientProfile;

    this.form = this.fb.group({
      [CASE_MODAL_FORM_PARAMS.CURRENT_DAY]: [{ value: this.currentDay, disabled: true }],
      [CASE_MODAL_FORM_PARAMS.CURRENT_TIME]: [moment().format('HH:mm')],
      [CASE_MODAL_FORM_PARAMS.SHORT_INSULIN]: [0],
      [CASE_MODAL_FORM_PARAMS.BASE_INSULIN]: [0],
      [CASE_MODAL_FORM_PARAMS.MEAL_TYPE]: ['breakfast'],
      [CASE_MODAL_FORM_PARAMS.MEAL_DESCRIPTION]: [''],
      [CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION]: [''],
      [CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION_TYPE]: ['mmol/L']
    });

    this.initIndication();
    this.initBaseInsulinState();
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

  checkIndicationType(event: KeyboardEvent): void {
    const isDecimal = this.form.controls[CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION_TYPE].value === IndicationTypeEnum.DECIMAL;

    if (!isDecimal && event.code === 'Period' || event.code === 'Comma') {
      event.preventDefault();
    }

    if (event.code === 'Minus') {
      event.preventDefault();
    }
  }

  saveBaseInsulinState(state: MatCheckboxChange): void {
    state.checked ? this.storeBaseInsulinState(): this.revokeBaseInsulinState();
  }

  revokeBaseInsulinState(): void {
    this.lsService.remove('base-insulin-state');
    this.baseInsulinStateChecked = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initIndication(): any {
    const indicationControl = this.form.controls[CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION];
    const indicationTypeControl = this.form.controls[CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION_TYPE];

    if (indicationTypeControl.value === IndicationTypeEnum.DECIMAL) {
      indicationControl.setValue('0.0');
    }

    if (indicationTypeControl.value === IndicationTypeEnum.INTEGER) {
      indicationControl.setValue('0');
    }

    const indicationTypeSubscription = this.form.controls[CASE_MODAL_FORM_PARAMS.GLUCO_INDICATION_TYPE]
      .valueChanges.subscribe(() => this.initIndication());

    this.subscriptions.add(indicationTypeSubscription);
  }

  private initBaseInsulinState(): void {
    const state = this.lsService.get('base-insulin-state') as any;

    if (!state) {
      return;
    }

    this.form.controls[CASE_MODAL_FORM_PARAMS.BASE_INSULIN].setValue(state.value);
    this.baseInsulinStateChecked = state.checked;
  }

  private storeBaseInsulinState(): void {
    const state = {
      checked: true,
      value: this.form.controls[CASE_MODAL_FORM_PARAMS.BASE_INSULIN].value
    };

    this.lsService.set('base-insulin-state', state);
  }
}
