import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  urlPedido = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  //consulta todos los pedidos que diferente de estatus = carrito
  consultarTodo(){
    return this.http.get(this.urlPedido);
  }

  //consultas like
  consultarLikeEstatus(filtros){
    return this.http.post<any>(this.urlPedido + '/buscar-like-cliente-codigo-estatus', filtros);
  }

  consultaLike(filtros){
    return this.http.post<any>(this.urlPedido + '/buscar-like-cliente-codigo', filtros);
  }

  //consultar pedidos que no esten en carrito
  consultarPedidosDifCa(filtros){
    return this.http.post<any>(this.urlPedido + '/buscar-pedidos-diferente-carrito', filtros);
  }

  consultarIdPedido(pedido){
    return this.http.post<any>(this.urlPedido +'/consultar-pedido-id', pedido);
  }

  regPedido(pedido){
    return this.http.post<any>(this.urlPedido, pedido)
  }

  consultarPedidosEstatusCliente(filtros){
    return this.http.post<any>(this.urlPedido + '/buscar-pedidos-estatus-cliente', filtros);
  }

  //agrega un producto al pedido 
  agregarProducto(producto){
    return this.http.post<any>(this.urlPedido + '/agregar-producto', producto);
  }

  //modificar la cantidad y el monto de un producto en el pedido
  modificarProducto(producto){
    return this.http.put<any>(this.urlPedido + '/modificar-prod', producto);
  }

  modificarEstatusPedido(pedido){
    return this.http.put<any>(this.urlPedido + '/modificar-pedido-estatus', pedido);
  }

  //eliminar un producto del pedido en el arreglo tiene
  eliminarProducto(producto){
    return this.http.post<any>(this.urlPedido + '/eliminar-producto', producto);
  }

  eliminarPedido(pedido){
    return this.http.post<any>(this.urlPedido + '/eliminar', pedido);
  }

  //consultar si un pedido de cierto cliente esta en carrito
  buscarPedidoCarrito(datos){
    return this.http.post<any>(this.urlPedido + '/buscar-pedido-carrito', datos);
  }

  //consultar si un producto ya esta registrado en el pedido
  buscarProductoCarrito(pedido){
    return this.http.post<any>(this.urlPedido + '/buscar-producto-carrito', pedido);
  }

  //modificar pedido
  modificarPedidoCarrito(pedido){
    return this.http.put<any>(this.urlPedido + '/modificar-pedido-carrito', pedido);
  }
}
