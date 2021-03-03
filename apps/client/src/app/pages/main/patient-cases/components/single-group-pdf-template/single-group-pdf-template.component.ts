import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { fromPromise } from 'rxjs/internal-compatibility';
import { Subscription } from 'rxjs';

import { CaseGroupInterface, UserInterface } from '@daily-diabetes/shared-data';

@Component({
  selector: 'dd-single-group-pdf-template',
  templateUrl: './single-group-pdf-template.component.html',
  styleUrls: ['./single-group-pdf-template.component.scss']
})
export class SingleGroupPdfTemplateComponent implements AfterViewInit, OnDestroy {

  @Input() patientProfile: UserInterface;
  @Input() caseGroup: CaseGroupInterface;

  private subscriptions: Subscription = new Subscription();

  @ViewChild('mainContent') mainContent: ElementRef;

  ngAfterViewInit(): void {
    // this.createPDF();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  createPDF(): void {
    const pdfSubscription = fromPromise(html2canvas(this.mainContent.nativeElement, {
      backgroundColor: '#ffffff',
      imageTimeout: 1500,
    })).subscribe((canvas) => {

      const document = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      const imageData = canvas.toDataURL('image/jpeg', 1.0);
      document.addImage(imageData,0,0, canvas.width, canvas.height);

      document.save(`${ this.caseGroup.title }.pdf`);

    });

    this.subscriptions.add(pdfSubscription);
  }

}
