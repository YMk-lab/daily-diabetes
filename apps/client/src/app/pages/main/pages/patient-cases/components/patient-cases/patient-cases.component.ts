import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dd-patient-cases',
  templateUrl: './patient-cases.component.html',
  styleUrls: ['./patient-cases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientCasesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
