import { Component, OnInit } from '@angular/core';
//servicios
import { EmpleadoService } from '../../../services/empleado.service';
import * as $ from 'jquery';
import { exit } from 'process';


@Component({
  selector: 'app-empleado-crud',
  templateUrl: './empleado-crud.component.html',
  styleUrls: ['./empleado-crud.component.css']
})
export class EmpleadoCrudComponent implements OnInit {
    
    exito = 0;
    empleado = {
        nombre: "",
        apellidos: "",
        telefono: "",
        sueldo: 0,
        correo: "",
        contrasenia: "",
        fechaNac: "",
        tipo: ""   
      }

      empleadoB = {
        nombre: "",
        apellidos: ""
      }

      empleadoM = {
        nombre: "",
        apellidos: "",
        telefono: "",
        sueldo: 0,
        correo: "",
        contrasenia: "",
        fechaNac: "",
        tipo: ""   
      }

      empleados;

      letra = "";
      
      empleadosFiltrados;

      cambiarContra = false;

      exitoContra = 0;

      p: number = 1;

  constructor( private empleadoService : EmpleadoService ) { }

  ngOnInit(): void {
      this.consultarTodo();
  }

//Empleado CRUD
regEmp(){
    this.empleadoService.regEmp(this.empleado).subscribe(res =>{
        this.exito = 1;
        this.limpiarEmp();
        this.consultarTodo();       
    }, err =>{
        this.exito = 2;
    });
}

consultarEmp( correo ){
    this.empleadoM.correo = correo; 

    this.empleadoService.consultarEmpCorreo(this.empleadoM).subscribe(res=>{
        let fechaNacimiento;
        this.empleadoM = res;
        this.empleadoM.contrasenia = "";
        fechaNacimiento = this.empleadoM.fechaNac.split('T');
        this.empleadoM.fechaNac = fechaNacimiento[0];
        this.letra = this.empleadoM.nombre.charAt(0);
      },
      err => console.log(err)
      );
}

modificarEmp(){
    this.empleadoService.modificarEmp(this.empleadoM).subscribe(res => {
        this.exito = 1;
        this.consultarTodo();
    },
    err => {
        this.exito = 2;
    });

    if(this.cambiarContra)
        this.modificarContra();
}

modificarContra(){
    this.empleadoService.modificarContraEmp(this.empleadoM).subscribe(res => {
        this.exito = 1;
        this.exitoContra = 0;
        this.consultarTodo();
    },
    err => {
        this.exitoContra = 3;
    });
}

consultarTodo(){
    this.empleados = this.empleadoService.consultarTodoEmp();
}

eliminarEmp(){
    this.empleadoService.eliminarEmp(this.empleadoM).subscribe(res => {
        this.consultarTodo();
    },  
    err => console.log(err));
}

buscarEmpLike(){
    this.empleadoService.buscarEmpLike(this.empleadoB).subscribe(res => {
        this.empleadosFiltrados = res;
    }, 
    err => console.log(err));
}

//funciones extra
reiniciarExito(){
    this.exito = 0;
}

limpiarEmp(){
    this.empleado.nombre = "";
    this.empleado.apellidos = "";
    this.empleado.correo = "";
    this.empleado.contrasenia = "";
    this.empleado.fechaNac = "";
    this.empleado.tipo = "";
    this.empleado.telefono = "";
    this.empleado.sueldo = 0;
}

cambiarContraEmp(){
    if(this.cambiarContra)
        this.cambiarContra = false;
    else
        this.cambiarContra = true;
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
