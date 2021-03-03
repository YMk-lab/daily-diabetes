import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGroupPdfTemplateComponent } from './single-group-pdf-template.component';

describe('SingleGroupPdfTemplateComponent', () => {
  let component: SingleGroupPdfTemplateComponent;
  let fixture: ComponentFixture<SingleGroupPdfTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleGroupPdfTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGroupPdfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
