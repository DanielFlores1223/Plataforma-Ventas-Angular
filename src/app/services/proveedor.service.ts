import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private urlProv = 'http://localhost:3000/proveedores'

  constructor(private http : HttpClient) { }

  consultarTodo(){
    return this.http.get(this.urlProv);
  }

  consultarProvId(proveedor){
    return this.http.post<any>(this.urlProv + "/buscar-prov-id", proveedor);
  }

  regProv(proveedor){
    return this.http.post<any>(this.urlProv, proveedor);
  }

  consultarLikeProv(proveedor){
    return this.http.post<any>(this.urlProv + "/buscar-like", proveedor);
  }

  modificarProv(proveedor){
    return this.http.put<any>(this.urlProv, proveedor);
  }

  eliminarProv(proveedor){
    return this.http.post<any>(this.urlProv + "/eliminar", proveedor);
  }
}
