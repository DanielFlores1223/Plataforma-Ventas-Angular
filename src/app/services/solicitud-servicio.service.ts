import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class SolicitudServicioService {
  private urlSolServ = 'http://localhost:3000/solicitudServicio';

  constructor(private http : HttpClient) { }

  consultarTodo(){
    return this.http.get(this.urlSolServ);
  }

  buscarLikeCel(filtros){
    return this.http.post(this.urlSolServ + '/buscar-like-cel', filtros);
  }

  buscarLikeCelEst(filtros){
    return this.http.post(this.urlSolServ + '/buscar-like-cel-estatus', filtros);
  }

  regSolicitud(solicitud){
    return this.http.post(this.urlSolServ, solicitud);
  }

  modificarEstEmp(campos){
    return this.http.put(this.urlSolServ + '/modificar-estatus-emp', campos);
  }

  eliminar(solicitud){
    return this.http.post(this.urlSolServ + '/eliminar', solicitud);
  }
}
