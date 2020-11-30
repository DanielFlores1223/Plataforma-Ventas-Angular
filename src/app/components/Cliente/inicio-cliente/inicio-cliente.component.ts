import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//servicios
import {ClienteService} from '../../../services/cliente.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css']
})
export class InicioClienteComponent implements OnInit {
  nombre = localStorage.getItem('nombre');
  letra = this.nombre.charAt(0);
  correo : String = localStorage.getItem('correo');
  
  cliente = {
    nombre: '',
    apellidos: '',
    telefono: '',
    estatus: '',
    correo: this.correo,
    contrasenia: '',
    fechaNac: '',
    tipo: ''
  }

  clienteM = {
    _id : '',
    nombre: '',
    apellidos: '',
    telefono: '',
    estatus: '',
    correo: '',
    contrasenia: '',
    fechaNac: '',
    tipo: ''
  }

  contasenias = {
    contrasenia: "",
    contrasenia2: "",
    correo : ''
  }

  clienteE;

fechaNacimiento = String[''];
modificarPerfil = false;
modificarContra = false;
exito = 0;
exitoContra = 0;

  constructor( private clienteService : ClienteService, private rutas : Router) { }

  ngOnInit(): void {
    this.miInfo();
  }

  miInfo(){

    this.clienteService.consultarCliCorreo(this.cliente).subscribe(res=>{
        this.cliente = res;
       //this.clienteM._id = this.cliente._id;

    })
  }

  infoModificar(){
    this.clienteService.consultarCliCorreo(this.cliente).subscribe(res => {
      this.clienteM = res;
    },
    err => console.log(err))
  }

  modificarPerfilCli(){

    if(this.modificarPerfil){
        this.clienteService.modificarCli(this.clienteM).subscribe   (res=> {
          this.exito = 1;
          this.miInfo();
        },
        err => {
          this.exito = 2;
        });
    }

    if (this.modificarContra) {
      if(this.contasenias.contrasenia === this.contasenias.contrasenia2){ 
        this.contasenias.correo = localStorage.getItem('correo');
        this.clienteService.modificarContra(this.contasenias).subscribe(res=>{
          this.exito = 1;
          this.cerrarSesion();
        },
        err => {
          this.exito = 2;
        });
      
      }else{
        this.exitoContra = 3;
      }
    }
  }

   //funciones extra
   reiniciarExito(){
    this.exito = 0;
  }

  modificarP(){
    if(this.modificarPerfil)
      this.modificarPerfil = false;
    else
      this.modificarPerfil = true;
  }

  modificarC(){
    if(this.modificarContra)
      this.modificarContra = false;
    else
      this.modificarContra = true;
  }

  cerrarSesion(){
    //elimina las variables del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('tipo');
    localStorage.removeItem('correo')
    this.rutas.navigate(['/inicio']);
  }

}
