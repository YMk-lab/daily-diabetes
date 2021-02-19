import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserInterface } from '@daily-diabetes/shared-data';

import { PATIENT_INFO_FORM } from '../../../../../registration/components/patient-info/patient-info-form.params';
import { PATIENT_ADDRESS_FORM } from '../../../../../registration/components/patient-address-info/patient-address-form.params';

@Component({
  selector: 'dd-patient-profile-edit',
  templateUrl: './patient-profile-edit.component.html',
  styleUrls: ['./patient-profile-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientProfileEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private modalData: { patientProfile: UserInterface },
    private modal: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      [PATIENT_INFO_FORM.FIRST_NAME]: [this.modalData.patientProfile.firstName, Validators.required],
      [PATIENT_INFO_FORM.LAST_NAME]: [this.modalData.patientProfile.lastName, Validators.required],
      [PATIENT_INFO_FORM.BIRTH_DATE]: [this.modalData.patientProfile.birthDate, Validators.required],
      [PATIENT_INFO_FORM.PHONE]: [this.modalData.patientProfile.phone, Validators.required],
      [PATIENT_INFO_FORM.EMAIL]: [this.modalData.patientProfile.email, [Validators.required, Validators.email] ],
      [PATIENT_ADDRESS_FORM.COUNTRY]: [this.modalData.patientProfile.address.country, Validators.required],
      [PATIENT_ADDRESS_FORM.CITY_OR_VILLAGE]: [this.modalData.patientProfile.address.cityOrVillage, Validators.required],
      [PATIENT_ADDRESS_FORM.ZIP_CODE]: [this.modalData.patientProfile.address.postalZipCode, Validators.required],
      [PATIENT_ADDRESS_FORM.ADDRESS]: [this.modalData.patientProfile.address.address, Validators.required]
    })
  }

}
