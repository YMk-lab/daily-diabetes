import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCasesComponent } from './patient-cases.component';

describe('PatientCasesComponent', () => {
  let component: PatientCasesComponent;
  let fixture: ComponentFixture<PatientCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
