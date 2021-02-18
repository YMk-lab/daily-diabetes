import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { UserInterface } from '@daily-diabetes/shared-data';

@Component({
  selector: 'dd-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public modalData: { patientProfile: UserInterface },
    private modal: MatDialog
  ) { }

  close(): void {
    this.modal.closeAll();
  }

}
