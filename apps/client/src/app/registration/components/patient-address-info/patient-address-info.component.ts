import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dd-patient-address-info',
  templateUrl: './patient-address-info.component.html',
  styleUrls: ['./patient-address-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientAddressInfoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
