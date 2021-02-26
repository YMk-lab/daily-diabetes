import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

import { CaseGroupInterface } from '@daily-diabetes/shared-data';

@Component({
  selector: 'dd-case-group',
  templateUrl: './case-group.component.html',
  styleUrls: ['./case-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CaseGroupComponent {

  @Input() set group(group: CaseGroupInterface) {

    if (!group) {
      return;
    }

    this.caseGroup = group;
    this.caseGroupExpanded = group.title === this.today;
  }

  caseGroup: CaseGroupInterface;

  today = moment(new Date()).format('DD.MM.YYYY').toString();
  caseGroupExpanded: boolean;
  caseListDisplayColumn = [
    'currentTime',
    'glucometerIndication',
    'glucometerIndicationType',
    'shortInsulin',
    'baseInsulin',
    'mealType',
    'mealDescription'
  ];
}
