import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private urlInv = "http://localhost:3000/productos";

  constructor(private http: HttpClient) { }

  consultarTodo(){
    return this.http.get<any>(this.urlInv);
  }

  regProd(producto){
    return this.http.post<any>(this.urlInv, producto);
  }

  agregarProv(prodProv){
    return this.http.post<any>(this.urlInv + '/agregar-proveedor', prodProv);
  }

  modificarProd(producto){
    return this.http.put<any>(this.urlInv, producto);
  }

  eliminarProd(producto){
    return this.http.post<any>(this.urlInv + "/eliminar", producto);
  }

  eliminarProvProd(prodProv){
    return this.http.post<any>(this.urlInv + "/eliminar-proveedor", prodProv);
  }

  buscarLikeInv(producto){
    return this.http.post<any>(this.urlInv + "/buscar-like", producto);
  }

  buscarLikeCatInv(producto){
    return this.http.post<any>(this.urlInv + "/buscar-like-categoria", producto);
  }

  buscarCodigo(producto){
    return this.http.post<any>(this.urlInv + "/buscar-prod-codigo", producto);
  }

  buscarLikeCatSub(filtros){
    return this.http.post<any>(this.urlInv + "/buscar-like-categoria-sub", filtros)
  }

  //consulta todo sin necesidad de async
  buscarTodoSA(nada){
    return this.http.post<any>(this.urlInv + '/buscar-todo', nada);
  }
}
