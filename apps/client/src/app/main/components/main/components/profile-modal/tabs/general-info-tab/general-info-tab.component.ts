import { Component, Input, ViewEncapsulation } from '@angular/core';

import { UserInterface } from '@daily-diabetes/shared-data';

@Component({
  selector: 'dd-general-info-tab',
  templateUrl: './general-info-tab.component.html',
  styleUrls: ['./general-info-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoTabComponent {

  @Input() patientProfile: UserInterface;
}
