import { Component, OnInit } from '@angular/core';
//servicios
import { EmpleadoService } from '../../../services/empleado.service';


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

      rol = "";

  constructor( private empleadoService : EmpleadoService ) { }

  ngOnInit(): void {
      this.consultarTodo();
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

//Empleado CRUD
regEmp(){
    this.empleadoService.regEmp(this.empleado).subscribe(res =>{
        this.exito = 1;
        this.limpiarEmp();
        this.consultarTodo();
    }, erro =>{
        this.exito = 2;
    });
}

modificarEmp( correo ){
    this.empleadoM.correo = correo; 

    this.empleadoService.consultarEmpCorreo(this.empleadoM).subscribe(res=>{
        let fechaNacimiento;
        this.empleadoM = res;
        this.rol = this.empleadoM.tipo;
        this.empleadoM.tipo = "";
        fechaNacimiento = this.empleadoM.fechaNac.split('T');
        this.empleadoM.fechaNac = fechaNacimiento[0];
      },
      err => console.log(err)
      );
}

consultarTodo(){
    this.empleados = this.empleadoService.consultarTodoEmp();
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
