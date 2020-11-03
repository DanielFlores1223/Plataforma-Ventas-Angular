import { Component, OnInit } from '@angular/core';
//servicio
import {EmpleadoService} from '../../../services/empleado.service';

@Component({
  selector: 'app-inicio-empleado',
  templateUrl: './inicio-empleado.component.html',
  styleUrls: ['./inicio-empleado.component.css']
})
export class InicioEmpleadoComponent implements OnInit {
 nombre = localStorage.getItem('nombre');
 letra = this.nombre.charAt(0);
 correo : String = localStorage.getItem('correo');
 
 empleado = {
  nombre: "",
  apellidoP: "",
  apellidoM: "",
  telefono: "",
  sueldo: 0,
  estatus: "",
  correo: this.correo,
  contrasenia: "",
  fechaNac: "",
  tipo: ""   
}

  constructor(private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.miInfo();
    //console.log(this.empleado2)
    //console.log(this.correo)
  }

  miInfo(){
    this.empleadoService.consultarEmpCorreo(this.empleado).subscribe(res=>{
      this.empleado = res;
    },
    err => console.log(err)
    );
  }
}
