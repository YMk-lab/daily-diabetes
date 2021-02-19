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
export class EmptyCasesListComponent implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  constructor(private modal: MatDialog) { }

  openNewCaseModal(): void {
    const modal = this.modal.open(AddNewCaseModalComponent, {
      width: '60vw',
      height: '80vh',
      maxWidth: '60vw',
      maxHeight: '80vh',
      disableClose: true,
      data: {}
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
