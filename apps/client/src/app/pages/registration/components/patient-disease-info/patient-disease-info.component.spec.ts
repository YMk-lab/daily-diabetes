import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiseaseInfoComponent } from './patient-disease-info.component';

describe('PatientDiseaseInfoComponent', () => {
  let component: PatientDiseaseInfoComponent;
  let fixture: ComponentFixture<PatientDiseaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDiseaseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDiseaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
