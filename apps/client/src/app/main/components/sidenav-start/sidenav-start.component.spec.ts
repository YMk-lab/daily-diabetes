import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavStartComponent } from './sidenav-start.component';

describe('SidenavStartComponent', () => {
  let component: SidenavStartComponent;
  let fixture: ComponentFixture<SidenavStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
