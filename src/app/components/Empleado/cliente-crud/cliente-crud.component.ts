import { Component, OnInit } from '@angular/core';
//servicios
import {ClienteService} from '../../../services/cliente.service';


@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {
  
  cliente = {
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    contrasenia: '',
    tipo: 'Cliente'
  }

  clienteB = {
    nombre: '',
    apellidos: ''
  }

  clienteM = {
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    contrasenia: ''
  }

  clientes;

  clientesFiltrados;

  exito = 0;

  letra = "";

  constructor(private clienteService : ClienteService) { }

  ngOnInit(): void {
    this.consultarTodo();
  }

  regCli(){
    this.clienteService.regCliente(this.cliente).subscribe(res => {
      this.exito = 1;
      this.limpiarCli();
      this.consultarTodo();     
    },
    err => {
      this.exito = 2;
    });
  }

  consultarCli( correo ){
    this.clienteM.correo = correo; 

    this.clienteService.consultarCliCorreo(this.clienteM).subscribe(res=>{
        this.clienteM = res;
        this.letra = this.clienteM.nombre.charAt(0);
      },
      err => console.log(err)
      );
  }

  modificarCli(){
    this.clienteService.modificarCli(this.clienteM).subscribe(res => {
      this.exito = 1;
      this.consultarTodo(); 
    },
    err => {
      this.exito = 2;
     // console.log(err);
    })
  }

  eliminarCli(){
    this.clienteService.eliminarCli(this.clienteM).subscribe(res => {
      this.consultarTodo();
    }, 
    err => console.log(err));
  }

  consultarTodo(){
    this.clientes = this.clienteService.consultarTodoCli();
  }

  consultarLike(){
    this.clienteService.buscarCliLike(this.clienteB).subscribe(res => {
      this.clientesFiltrados = res;
    },
    err => console.log(err));
  }

  //funciones extra
  reiniciarExito(){
    this.exito = 0;
  }

  limpiarCli(){
    this.cliente.nombre = "",
    this.cliente.apellidos = "",
    this.cliente.contrasenia = "",
    this.cliente.correo = "",
    this.cliente.telefono = ""
  }

  //validacion para formulario
  soloLetras(evento) {
    var key = evento.KeyCode || evento.which;
    var tecla = String.fromCharCode(key).toLocaleLowerCase();
    var letras = "abcdefghijklmnñopqrstuvwxyzáéíóú";
    var especiales = [32, 8, 239];

    var tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;

    } else {
        return true;
    }
    
}

soloNumeros(evento) {
  var key = evento.KeyCode || evento.which;
  var tecla = String.fromCharCode(key).toLocaleLowerCase();
  var numeros = "1234567890";
  var especiales = [8];

  var tecla_especial = false;
  for (var i in especiales) {
      if (key == especiales[i]) {
          tecla_especial = true;
          break;
      }
  }

  if (numeros.indexOf(tecla) == -1) {
      return false;

  } else {
      return true;
  }

}



}
