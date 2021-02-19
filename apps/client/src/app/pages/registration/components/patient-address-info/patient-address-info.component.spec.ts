import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddressInfoComponent } from './patient-address-info.component';

describe('PatientAddressInfoComponent', () => {
  let component: PatientAddressInfoComponent;
  let fixture: ComponentFixture<PatientAddressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddressInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
