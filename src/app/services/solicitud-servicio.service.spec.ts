import { TestBed } from '@angular/core/testing';

import { SolicitudServicioService } from './solicitud-servicio.service';

describe('SolicitudServicioService', () => {
  let service: SolicitudServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
