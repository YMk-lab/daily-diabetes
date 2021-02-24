import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { NavigationLinksInterface } from '../../../../../interfaces/navigation-links.interface';

@Component({
  selector: 'dd-sidenav-start',
  templateUrl: './sidenav-start.component.html',
  styleUrls: ['./sidenav-start.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavStartComponent implements OnDestroy {

  @Input() set patient(patient: UserInterface) {
    if (!patient) {
      return;
    }

    this.patientProfile = patient;
  }

  patientProfile: UserInterface;
  navigationLinks: NavigationLinksInterface[] = [
    {
      label: 'SIDENAV_START.LINKS.MY_CASES',
      link: 'patient-cases'
    },
    {
      label: 'SIDENAV_START.LINKS.MY_PROFILE',
      link: 'patient-profile'
    },
    {
      label: 'SIDENAV_START.LINKS.STATISTICS',
      link: 'statistics'
    },
    {
      label: 'SIDENAV_START.LINKS.ADD_PREVIOUS_CASES',
      link: 'add-previous-cases'
    },
    {
      label: 'SIDENAV_START.LINKS.PRODUCT_TABLE',
      link: 'products-table'
    },
    {
      label: 'SIDENAV_START.LINKS.SETTINGS',
      link: 'settings'
    }
  ];

  private subscriptions: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
