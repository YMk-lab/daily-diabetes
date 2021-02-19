import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCaseModalComponent } from './add-new-case-modal.component';

describe('AddNewCaseModalComponent', () => {
  let component: AddNewCaseModalComponent;
  let fixture: ComponentFixture<AddNewCaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCaseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
