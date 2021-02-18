import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { NavigationLinksInterface } from '../../interfaces/navigation-links.interface';

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
      link: '/main/cases'
    },
    {
      label: 'Statistics',
      link: 'main/profile'
    },
    {
      label: 'Add previous cases',
      link: 'main/add-previous-cases'
    },
    {
      label: 'Products tables',
      link: 'main/products-table'
    },
    {
      label: 'Settings',
      link: 'main/settings'
    }
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) { }

  async navigateTo(link: string): Promise<void> {
    await this.router.navigate([link]);
  }

  editProfile(): void {
    console.log('Open profile modal...');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
