import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private urlServ = 'http://localhost:3000/servicios';

  constructor(private http : HttpClient) { }

  consultarTodo(){
    return this.http.get(this.urlServ);
  }
}
