import { TestBed } from '@angular/core/testing';

import { GuardiaPaginaInfoGuard } from './guardia-pagina-info.guard';

describe('GuardiaPaginaInfoGuard', () => {
  let guard: GuardiaPaginaInfoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardiaPaginaInfoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
