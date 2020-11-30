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

  regSolicitud(solicitud){
    return this.http.post(this.urlSolServ, solicitud);
  }
}
