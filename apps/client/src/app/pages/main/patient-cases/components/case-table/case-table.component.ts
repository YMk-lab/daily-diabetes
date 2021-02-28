import { Component, Input, ViewEncapsulation } from '@angular/core';

import { CaseInterface } from '@daily-diabetes/shared-data';

@Component({
  selector: 'dd-case-table',
  templateUrl: './case-table.component.html',
  styleUrls: ['./case-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseTableComponent {

  @Input() cases: CaseInterface[];

  tableColumnDefs: string[] = [
    'currentTime',
    'glucometerIndication',
    'glucometerIndicationType',
    'shortInsulin',
    'baseInsulin',
    'mealType',
    'mealDescription',
  ];

}
