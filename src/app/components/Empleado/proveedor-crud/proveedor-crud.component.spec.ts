import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorCrudComponent } from './proveedor-crud.component';

describe('ProveedorCrudComponent', () => {
  let component: ProveedorCrudComponent;
  let fixture: ComponentFixture<ProveedorCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
