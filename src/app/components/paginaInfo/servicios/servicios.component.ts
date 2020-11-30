import { Component, OnInit } from '@angular/core';
//servicios
import {ServiciosService} from '../../../services/servicios.service';
import {SolicitudServicioService} from '../../../services/solicitud-servicio.service'
import { LoginService } from '../../../services/login.service';
import {ClienteService} from '../../../services/cliente.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  servicio = {
    value : '',
    img: '../assets/img/servicios.jpg',
    btn : ''
  }

  solicitud = {
    numCelular : '',
    estatus: 'Pendiente',
    nombreCli: '',
    apellidosCli: '',
    telefonoCli: '',
    correoCli: '',
    nombreS: '',
    precioS: ''
  }

  filtroCliente = {
    correo : ''
  }

  servicios;

  exito = 0;

  constructor(private loginService : LoginService, private servicerService: ServiciosService, private solicitudService : SolicitudServicioService,  private clienteService : ClienteService) { }
  tipo;
  entro = false;
  desplegarBtn = false;

  ngOnInit(): void {
    this.consultarTodo();

    this.loginService.change.subscribe(isOpen => {
      this.entro = isOpen;
    });

    this.loginService.change1.subscribe(isOpen =>{
      this.tipo = isOpen;
    });

    this.entro = this.loginService.loginExito();
    this.tipo = this.loginService.tipoUsu();

  }

  consultarTodo(){
    this.servicios = this.servicerService.consultarTodo();
  }

  obtenerImg(){
    console.log(this.servicio.value)
    let array = this.servicio.value.split('|')
    this.servicio.img = array[2];
  }

  obtenerBtn(){
    let array = this.servicio.value.split('|')
    this.servicio.btn = array[3];
  }

  regSolicitud(){
    this.exito = 3;
    let array = this.servicio.value.split('|');
    this.solicitud.nombreS = array[0];
    this.solicitud.precioS = array[1];

    if (this.entro && this.tipo == 'Cliente') {
      //si hay una sesion iniciada toma los datos del cliente que solicito la recarga (servicio)
      this.filtroCliente.correo = localStorage.getItem('correo');
      this.clienteService.consultarCliCorreo(this.filtroCliente).subscribe( res => {
        this.solicitud.nombreCli = res.nombre;
        this.solicitud.apellidosCli = res.apellidos;
        this.solicitud.telefonoCli = res.telefono;
        this.solicitud.correoCli = res.correo;
        this.registrar()
      })
    }else{
      this.registrar();
    }

   
  }

  registrar(){
    this.solicitudService.regSolicitud(this.solicitud).subscribe(res => {
      this.desplegarBtn = true;
      this.limpiarSolicitud();
      this.exito = 1;
    },
    err => {
      this.exito = 2;
      console.log(err)
    })
  }

  limpiarSolicitud(){
    this.solicitud.numCelular = '';
    this.servicio.value = '';
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

