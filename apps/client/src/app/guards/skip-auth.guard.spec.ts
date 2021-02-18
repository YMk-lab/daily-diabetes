import { TestBed } from '@angular/core/testing';

import { SkipAuthGuard } from './skip-auth.guard';

describe('EnsureAuthGuard', () => {
  let guard: SkipAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SkipAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
