import { Component, OnInit } from '@angular/core';
//servicios
import {ProveedorService} from '../../../services/proveedor.service';

@Component({
  selector: 'app-proveedor-crud',
  templateUrl: './proveedor-crud.component.html',
  styleUrls: ['./proveedor-crud.component.css']
})
export class ProveedorCrudComponent implements OnInit {
  tipoEmp = localStorage.getItem('tipo');
  
  proveedor = {
    nombreProveedor : "",
    nombreAgente : "",
    categoria : "",
    horario : "",
    telefono : ""
  }

  proveedorM = {
    _id : "",
    nombreProveedor : "",
    nombreAgente : "",
    categoria : "",
    horario : "",
    telefono : ""
  }

  proveedorB = {
    nombre : ""
  }

  proveedores;

  proveedoresFiltrados;

  p: number = 1;

  exito = 0;
  
  constructor(private provService : ProveedorService) { }

  ngOnInit(): void {
    this.consultarTodo();
  }

  regProv(){
    this.provService.regProv(this.proveedor).subscribe(res=>{
      this.exito = 1;
      this.consultarTodo();
      this.limpiarProv();
    }, 
    err => {
      this.exito = 2;
    })
  }

  consultarTodo(){
    this.proveedores = this.provService.consultarTodo();
  }

  buscarProvLike(){
    this.provService.consultarLikeProv(this.proveedorB).subscribe(res => {
      this.proveedoresFiltrados = res;
    }, 
    err => console.log(err));
  }

  consultarProv(id){
    this.proveedorM._id = id;

    this.provService.consultarProvId(this.proveedorM).subscribe(res => {
      this.proveedorM = res;
    },
    err => console.log(err));
  }

  eliminarProv(){
    this.provService.eliminarProv(this.proveedorM).subscribe(res =>{
      this.consultarTodo();
    },
    err => console.log(err));
  }

  modificarProv(){
    this.provService.modificarProv(this.proveedorM).subscribe(res =>{
      this.exito = 1;
      this.consultarTodo();
    },
    err => {
      this.exito = 2;
    })
  }

//funciones extra
limpiarProv(){
  this.proveedor.nombreAgente = "";
  this.proveedor.nombreProveedor = "";
  this.proveedor.horario = "";
  this.proveedor.categoria = "";
  this.proveedor.telefono = "";
}

reiniciarExito(){
  this.exito = 0;
}

//validacion
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
