import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlCli = 'http://localhost:3000/clientes'

  constructor(private http : HttpClient) { }

  regCliente(cliente){
    return this.http.post<any>(this.urlCli, cliente);
  }
}
