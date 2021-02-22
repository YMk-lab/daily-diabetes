import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateTimeFormatter } from '../../../../../classes/date-time-formatter';
import { QuillToolbarConfig } from 'ngx-quill';

@Component({
  selector: 'dd-add-new-case-modal',
  templateUrl: './add-new-case-modal.component.html',
  styleUrls: ['./add-new-case-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewCaseModalComponent implements OnInit {

  currentDay = new Date();
  editorConfig = {
    toolbar: [
      [{ list: 'ordered' }],
      ['bold', 'italic', 'underline']
    ]
  }
  form: FormGroup;

  constructor(
    private modal: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      currentDay: [{ value: this.currentDay, disabled: true }],
      time: [DateTimeFormatter.formatTime(new Date())]
    })
  }

  close(): void {
    this.modal.getDialogById('add-new-case-modal').close();
  }

  save(): void {
    console.log('ADD new case...');
  }

}
