import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { NavigationLinksInterface } from '../../interfaces/navigation-links.interface';
import { ProfileModalComponent } from '../main/components/profile-modal/profile-modal.component';

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
      label: 'MAIN.NAV_LINKS.MY_CASES',
      link: '/main/cases'
    },
    {
      label: 'MAIN.NAV_LINKS.STATISTICS',
      link: 'main/profile'
    },
    {
      label: 'MAIN.NAV_LINKS.ADD_PREVIOUS_CASES',
      link: 'main/add-previous-cases'
    },
    {
      label: 'MAIN.NAV_LINKS.PRODUCTS_TABLE',
      link: 'main/products-table'
    },
    {
      label: 'MAIN.NAV_LINKS.SETTINGS',
      link: 'main/settings'
    }
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private modal: MatDialog) { }

  async navigateTo(link: string): Promise<void> {
    await this.router.navigate([link]);
  }

  editProfile(): void {
    this.modal.open(ProfileModalComponent, {
      width: '60vw',
      height: '80vh',
      maxWidth: '60vw',
      maxHeight: '80vh',
      disableClose: true,
      data: {
        patientProfile: this.patientProfile
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
