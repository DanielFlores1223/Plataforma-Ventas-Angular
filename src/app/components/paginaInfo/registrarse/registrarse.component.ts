import { Component, OnInit } from '@angular/core';
//servicio
import { ClienteService } from '../../../services/cliente.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  cliente = {
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    contrasenia: '',
    tipo: 'Cliente'
  }

  mensaje = '';
  img = '';
  exito = false;
  alert = '';
  instrucciones = ['Llenar todos los campos obligatorios','Verificar que el correo eléctronico no este registrado']

  constructor(private clienteService : ClienteService) { }

  ngOnInit(): void {
  }

  regCli(){

    this.clienteService.regCliente(this.cliente).subscribe(res =>{
      this.mensaje ='Te has registrado de manera exitosa!';
      this.img = 'exito.gif';
      this.alert = 'alert-success';
      this.exito = true;
    },
    err =>{
      console.log(err)
      this.exito= false;
    } );

    if (!this.exito){
      this.mensaje ='Hubo un error en tu registro!';
      this.img = 'incorrecto.gif';
      this.alert = 'alert-danger';
    }
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
