import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoTabComponent } from './general-info-tab.component';

describe('GeneralInfoTabComponent', () => {
  let component: GeneralInfoTabComponent;
  let fixture: ComponentFixture<GeneralInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
