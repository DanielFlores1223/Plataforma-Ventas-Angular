import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
//servicios
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-sidebar-empleado',
  templateUrl: './sidebar-empleado.component.html',
  styleUrls: ['./sidebar-empleado.component.css']
})
export class SidebarEmpleadoComponent implements OnInit {
  tipo = localStorage.getItem('tipo');
  entro : boolean;
  
  constructor(private loginService : LoginService, private rutas : Router) { }

  ngOnInit(): void {
  
}

cerrarSesion(){
  //elimina las variables del localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('nombre');
  localStorage.removeItem('tipo');
  localStorage.removeItem('correo')
  this.entro = this.loginService.loginExito();
  this.rutas.navigate(['/inicio']);
}
}
