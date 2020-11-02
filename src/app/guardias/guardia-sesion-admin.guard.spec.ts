import { TestBed } from '@angular/core/testing';

import { GuardiaSesionAdminGuard } from './guardia-sesion-admin.guard';

describe('GuardiaSesionAdminGuard', () => {
  let guard: GuardiaSesionAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardiaSesionAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
