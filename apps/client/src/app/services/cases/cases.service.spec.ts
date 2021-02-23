import { TestBed } from '@angular/core/testing';

import { CasesService } from './cases.service';

describe('CaseService', () => {
  let service: CasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
