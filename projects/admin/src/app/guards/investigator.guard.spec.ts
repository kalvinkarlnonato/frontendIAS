import { TestBed } from '@angular/core/testing';

import { InvestigatorGuard } from './investigator.guard';

describe('InvestigatorGuard', () => {
  let guard: InvestigatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InvestigatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
