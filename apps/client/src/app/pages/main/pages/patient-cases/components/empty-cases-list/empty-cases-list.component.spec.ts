import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCasesListComponent } from './empty-cases-list.component';

describe('EmptyCasesListComponent', () => {
  let component: EmptyCasesListComponent;
  let fixture: ComponentFixture<EmptyCasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyCasesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
