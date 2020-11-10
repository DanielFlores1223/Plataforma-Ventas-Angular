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
  apellidos: "",
  telefono: "",
  sueldo: 0,
  correo: this.correo,
  contrasenia: "",
  fechaNac: "",
  tipo: ""   
}

fechaNacimiento = String[''];
  constructor(private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.miInfo();
    let fecha = new Date()
    //fecha.setFullYear()

  }

  miInfo(){
    this.empleadoService.consultarEmpCorreo(this.empleado).subscribe(res=>{
      this.empleado = res;
      this.fechaNacimiento = this.empleado.fechaNac.split('T');
    },
    err => console.log(err)
    );
  }
}
