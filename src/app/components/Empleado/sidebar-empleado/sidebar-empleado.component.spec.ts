import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEmpleadoComponent } from './sidebar-empleado.component';

describe('SidebarEmpleadoComponent', () => {
  let component: SidebarEmpleadoComponent;
  let fixture: ComponentFixture<SidebarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
