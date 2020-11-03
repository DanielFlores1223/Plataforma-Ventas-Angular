import { Component, OnInit } from '@angular/core';
//servicios
import {ClienteService} from '../../../services/cliente.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.component.html',
  styleUrls: ['./inicio-cliente.component.css']
})
export class InicioClienteComponent implements OnInit {
  
  cliente = {
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    telefono: '',
    estatus: '',
    correo: 'jamesR@gmail.com',
    contrasenia: '',
    fechaNac: '',
    tipo: ''
  }

  clienteE;
  constructor( private clienteService : ClienteService) { }

  ngOnInit(): void {
    this.miInfo();
  }

  miInfo(){
    this.clienteService.consultarCliCorreo(this.cliente).subscribe(res=>{
        this.clienteE = res;
    })
  }

}
