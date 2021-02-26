import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dd-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActionsPanelComponent {

  @Output() openNewCaseModal: EventEmitter<void> = new EventEmitter<void>();

  addNewCase(): void {
    this.openNewCaseModal.emit();
  }
}
