import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { UserInterface } from '@daily-diabetes/shared-data';

import { UsersService } from '../../../../../services/users/users.service';
import { PatientProfileEditComponent } from '../patient-profile-edit/patient-profile-edit.component';

@Component({
  selector: 'dd-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientProfileComponent implements OnInit, OnDestroy {

  patientProfile: UserInterface;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private usersService: UsersService,
    private modal: MatDialog
  ) { }

  ngOnInit(): void {
    const patientProfileSubscription = this.usersService.patient$
      .subscribe((patientProfile: UserInterface) => this.patientProfile = patientProfile);

    this.subscriptions.add(patientProfileSubscription);
  }

  editProfile(): void {
    const modal = this.modal.open(PatientProfileEditComponent, {
      width: '65vw',
      height: '80vh',
      maxWidth: '65vw',
      maxHeight: '80vh',
      disableClose: true,
      data: { patientProfile: this.patientProfile }
    });

    const modalSubscription = modal.afterClosed().subscribe(() => {});
    this.subscriptions.add(modalSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
