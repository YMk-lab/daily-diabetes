import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dd-patient-disease-info',
  templateUrl: './patient-disease-info.component.html',
  styleUrls: ['./patient-disease-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientDiseaseInfoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

}
