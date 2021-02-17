import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelectionListChange } from '@angular/material/list';

import { UserInterface } from '@daily-diabetes/shared-data';

import { NavigationLinksInterface } from '../../interfaces/navigation-links.interface';

@Component({
  selector: 'dd-sidenav-start',
  templateUrl: './sidenav-start.component.html',
  styleUrls: ['./sidenav-start.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavStartComponent implements OnInit, OnDestroy {

  @Input() set patient(patient: UserInterface) {
    if (!patient) {
      return;
    }

    this.patientProfile = patient;
  }

  patientProfile: UserInterface;

  navigationLinks: NavigationLinksInterface[] = [
    {
      label: 'My profile',
      link: 'main/profile'
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
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  async navigateTo(selectionList: MatSelectionListChange): Promise<void> {
    const navigationLink = selectionList.options[0].value as NavigationLinksInterface;
    await this.router.navigate([navigationLink.link]);
  }
}
