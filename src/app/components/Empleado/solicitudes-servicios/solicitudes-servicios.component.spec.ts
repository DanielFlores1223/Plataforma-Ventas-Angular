import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesServiciosComponent } from './solicitudes-servicios.component';

describe('SolicitudesServiciosComponent', () => {
  let component: SolicitudesServiciosComponent;
  let fixture: ComponentFixture<SolicitudesServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
