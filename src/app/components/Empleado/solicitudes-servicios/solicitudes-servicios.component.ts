import { Component, OnInit } from '@angular/core';
//servicios
import {SolicitudServicioService} from '../../../services/solicitud-servicio.service';
import {EmpleadoService} from '../../../services/empleado.service';

@Component({
  selector: 'app-solicitudes-servicios',
  templateUrl: './solicitudes-servicios.component.html',
  styleUrls: ['./solicitudes-servicios.component.css']
})
export class SolicitudesServiciosComponent implements OnInit {
  servicios;

  filtros = {
    numCelular : '',
    estatus : '',
    correo : ''
  }

  camposMod = {
    id: '',
    estatus: '',
    correoEmp: '',
    nombreEmp: '',
    apellidosEmp: '',
    telefonoEmp: ''

  }

  p = 1
  idActual = '';

  constructor(private solicitudService: SolicitudServicioService, private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.buscar();
  }


  buscar(){
    if (this.filtros.estatus != '') 
      this.buscarLikeCelEst();
    else if(this.filtros.numCelular != '' && this.filtros.estatus == '')  
      this.buscarLikeCel();
    else
      this.consultarTodo();
  }

  consultarTodo(){
    this.solicitudService.consultarTodo().subscribe(res => {
      this.servicios = res;
    },
    err => console.log(err))
  }

  buscarLikeCel(){
    this.solicitudService.buscarLikeCel(this.filtros).subscribe(res => {
      this.servicios = res;
    })
  }

  buscarLikeCelEst(){
    this.solicitudService.buscarLikeCelEst(this.filtros).subscribe(res => {
      this.servicios = res;
    })
  }

  modificarEstatus(estatus, id){
    this.camposMod.estatus = estatus;
    this.camposMod.id = id;

    //se busca el empleado para conseguir la info correspondiente a la solicitud de servicio
    this.filtros.correo = localStorage.getItem('correo');
    this.empleadoService.consultarEmpCorreo(this.filtros).subscribe(res => {
      this.camposMod.nombreEmp = res.nombre,
      this.camposMod.apellidosEmp = res.apellidos,
      this.camposMod.correoEmp = res.correo,
      this.camposMod.telefonoEmp = res.telefono
      this.modificar();
    },
    err => console.log(err));

  }

  modificar(){
     //se modifica el servicio estatus y el objeto empleado
     this.solicitudService.modificarEstEmp(this.camposMod).subscribe(res => {
      this.buscar();
    },
    err => {
      console.log(err);
    })

  }

  eliminar(){
    this.camposMod.id = this.idActual;

    this.solicitudService.eliminar(this.camposMod).subscribe(res =>{
      this.buscar();
    },
    err => console.log(err));
  }

  obtenerId(id){
    this.idActual = id
  }
}
