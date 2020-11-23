import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//servicios
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService : LoginService, private rutas : Router) { }
  tipo;
  entro = false;

  ngOnInit(): void {
    this.loginService.change.subscribe(isOpen => {
      this.entro = isOpen;
    });

    this.loginService.change1.subscribe(isOpen =>{
      this.tipo = isOpen;
    });

    this.entro = this.loginService.loginExito();
    this.tipo = this.loginService.tipoUsu();
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
