import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import { AddNewCaseModalComponent } from '../add-new-case-modal/add-new-case-modal.component';

@Component({
  selector: 'dd-empty-cases-list',
  templateUrl: './empty-cases-list.component.html',
  styleUrls: ['./empty-cases-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmptyCasesListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  constructor(private modal: MatDialog) { }

  ngOnInit(): void {
    // TODO remove after whole modal implementation
    this.openNewCaseModal();
  }

  openNewCaseModal(): void {
    const modal = this.modal.open(AddNewCaseModalComponent, {
      width: '60vw',
      height: '85vh',
      maxWidth: '60vw',
      maxHeight: '85vh',
      disableClose: true,
      panelClass: 'dd-general-modal',
      id: 'add-new-case-modal'
    });

    const modalSubscription = modal.afterClosed().subscribe((data) => {
      console.log(data);
    });
    this.subscriptions.add(modalSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
