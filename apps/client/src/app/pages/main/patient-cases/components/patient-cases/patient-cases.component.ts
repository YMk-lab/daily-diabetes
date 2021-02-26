import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { CaseGroupInterface, UserInterface } from '@daily-diabetes/shared-data';

import { CasesService } from '../../../../../services/cases/cases.service';
import { UsersService } from '../../../../../services/users/users.service';
import { AddNewCaseModalComponent } from '../add-new-case-modal/add-new-case-modal.component';

@Component({
  selector: 'dd-patient-cases',
  templateUrl: './patient-cases.component.html',
  styleUrls: ['./patient-cases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientCasesComponent implements OnInit, OnDestroy {

  caseGroups: CaseGroupInterface[];
  areCasesLoaded: boolean;

  private patientProfile: UserInterface;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private casesService: CasesService,
    private usersService: UsersService,
    private modal: MatDialog
  ) { }

  ngOnInit(): void {
    this.initCaseGroupsList();
  }

  initCaseGroupsList() {
    const casesSubscription = this.usersService.patient$.pipe(
      switchMap((patientProfile: UserInterface) => {

        this.patientProfile = patientProfile;
        return this.initCaseGroups(patientProfile.uuid);
      })
    ).subscribe((caseGroups: CaseGroupInterface[]) => {
      this.caseGroups = caseGroups;
      this.areCasesLoaded = !!(caseGroups && caseGroups.length);
    });

    this.subscriptions.add(casesSubscription);
  }

  openNewCaseModal(): void {
    const modal = this.modal.open(AddNewCaseModalComponent, {
      width: '60vw',
      height: '85vh',
      maxWidth: '60vw',
      maxHeight: '85vh',
      disableClose: true,
      panelClass: 'dd-general-modal',
      id: 'add-new-cases-modal',
      data: { patientProfile: this.patientProfile }
    });

    const modalSubscription = modal.afterClosed().subscribe((data) => {
      if (data) {
        this.initCaseGroupsList();
      }
    });
    this.subscriptions.add(modalSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initCaseGroups(uuid: string): Observable<CaseGroupInterface[]> {
    return this.casesService.getAll(uuid);
  }
}
