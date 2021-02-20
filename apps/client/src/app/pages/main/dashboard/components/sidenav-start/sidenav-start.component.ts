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
      label: 'My cases',
      link: 'patient-cases'
    },
    {
      label: 'My profile',
      link: 'patient-profile'
    },
    {
      label: 'Statistics',
      link: 'statistics'
    },
    {
      label: 'Add new previous cases',
      link: 'add-previous-cases'
    },
    {
      label: 'Products table',
      link: 'products-table'
    },
    {
      label: 'Settings',
      link: 'settings'
    }
  ];

  private subscriptions: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
