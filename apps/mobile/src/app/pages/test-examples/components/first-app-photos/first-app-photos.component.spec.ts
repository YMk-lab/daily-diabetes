import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAppPhotosComponent } from './first-app-photos.component';

describe('FirstAppPhotosComponent', () => {
  let component: FirstAppPhotosComponent;
  let fixture: ComponentFixture<FirstAppPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstAppPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAppPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
