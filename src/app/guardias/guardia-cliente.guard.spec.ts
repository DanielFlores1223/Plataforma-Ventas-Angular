import { TestBed } from '@angular/core/testing';

import { GuardiaClienteGuard } from './guardia-cliente.guard';

describe('GuardiaClienteGuard', () => {
  let guard: GuardiaClienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardiaClienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
