import { Component, OnInit } from '@angular/core';
//servicios
import{ LoginService } from '../../../services/login.service';
//librerias
import { Router } from '@angular/router'; 
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  tipoUsu = "";
  usuario ={
    correo: "",
    contrasenia: ""
  }

  constructor( private loginService : LoginService, private rutas: Router) { }
  exito: boolean = true;

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.usuario).subscribe(
      res => {
         const datos = res.envio.split(',');
         localStorage.setItem('token', datos[0]);
         localStorage.setItem('nombre', datos[1]);
         localStorage.setItem('tipo', datos[2]);
         localStorage.setItem('correo', datos[3]);
         this.loginService.loginExito();
         this.tipoUsu = this.loginService.tipoUsu();   
         this.exito = true;
         
         if (this.tipoUsu == 'Admin' || this.tipoUsu == 'Cajero' || this.tipoUsu == 'Bodega') {          
          this.rutas.navigate(['/inicio-Empleado']);       
          window.location.reload();   
         
        }else if(this.tipoUsu == 'Cliente') {
          this.rutas.navigate(['/inicio-Cliente']);       
          window.location.reload();    
        }   
         
      },
      err =>{
        this.exito = false;
      }
    );
  }

  cerrarModal(){
    this.exito = true;
  }
  


}
