import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
//servicio
import {PedidoService} from '../../../services/pedido.service';
import {InventarioService} from '../../../services/inventario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  pagina = 1;

  constructor(private pedidoService : PedidoService, private productoService : InventarioService, private rutas: Router) { }

  filtrosCarrito = {
    correoCli : ''
  }

  carrito;

  total = 0;
  cantidadTotalProd = 0;

  productosInfo = [{
    cantidadProd : 0,
    monto : 0,
    idProductoCarrito : ''
  }];

  filtroCRUDCarrito = {
    idProd: '',
    id: ''
  }

  filtrosModificarProdCarrito = {
    _id : '',
    codigoProd: '',
    cantidadProd: 0,
    monto: 0
  }

  radio = 'En efectivo';
  entrega = 'tienda';
  fechaHoy: Date = new Date();
  fechaLimit = '';

  procesarCarrtio = {
    total: 0,
    metodoPago: 'En efectivo',
    direccionEnvio: '',
    fechaEntrega: '',
    estatus : 'Pendiente',
    correoCli : ''
  }

  ngOnInit(): void {
    this.consultarCarrito(); 
    let arregloFecha = this.fechaHoy.toDateString().split(' ');

    this.fechaLimit = this.fechaHoy.getFullYear() + "-" + (this.fechaHoy.getMonth()+1) + "-" + arregloFecha[2];
    
    this.procesarCarrtio.fechaEntrega = this.fechaLimit;
    
  }

  consultarCarrito(){
    this.filtrosCarrito.correoCli = localStorage.getItem('correo');

    this.pedidoService.buscarPedidoCarrito(this.filtrosCarrito).subscribe(res => {
      this.carrito = res;
      this.extraerInfoProd();
      //console.log('termino de llenarse, el resultado es:');
      //console.log(this.productosInfo);
    },err => {
      console.log(err);
    })
  }

  extraerInfoProd(){
    for (let i = 0; i < this.carrito.tiene.length; i++) {
      this.productoService.buscarCodigoProdCarrito(this.carrito.tiene[i]).subscribe(res => {
       // console.log('Producto: ' + i)
        //console.log(res);
        this.productosInfo[i] = res;
        this.productosInfo[i].cantidadProd = this.carrito.tiene[i].cantidadProd;
        this.cantidadTotalProd += this.carrito.tiene[i].cantidadProd;
        this.productosInfo[i].monto = this.carrito.tiene[i].monto;
        this.productosInfo[i].idProductoCarrito = this.carrito.tiene[i]._id;
        this.filtroCRUDCarrito.id = this.carrito._id;
        this.total += this.productosInfo[i].monto; 
      });    
    }
  }

  quitarProducto(id){
    this.filtroCRUDCarrito.idProd = id;

    this.pedidoService.eliminarProducto(this.filtroCRUDCarrito).subscribe(res => {
      this.total = 0;
      this.cantidadTotalProd = 0;
      this.consultarCarrito();
    }, err => console.log(err))
  }

  modificarCantidadProducto(idTiene, cantidad, codigoProd, precio){
    this.filtrosModificarProdCarrito._id = idTiene;
    this.filtrosModificarProdCarrito.codigoProd = codigoProd;
    this.filtrosModificarProdCarrito.cantidadProd = cantidad;
    this.filtrosModificarProdCarrito.monto = cantidad * precio;

    this.pedidoService.modificarProducto(this.filtrosModificarProdCarrito).subscribe(res => {
      this.total = 0;
      this.cantidadTotalProd = 0;
      this.consultarCarrito();
    }, err => console.log(err))
  }

  modificarPedidoCarrito(){
    //en esta funcion se modifica el pedido que este en carrito y lo convierte a pendiente
    this.procesarCarrtio.total = this.total;
    this.procesarCarrtio.correoCli = localStorage.getItem('correo');

    this.pedidoService.modificarPedidoCarrito(this.procesarCarrtio).subscribe(res => {
      this.total = 0;
      this.cantidadTotalProd = 0;
      this.consultarCarrito();
    },
    err => console.log(err));
  }

  recargarPagina(){
    location.reload();
  }

  //validaciones
  validarNumber(evento) {
    var key = evento.KeyCode || evento.which;
    var tecla = String.fromCharCode(key).toLocaleLowerCase();
    var numeros = "123456789";
    var especiales = [8];
    
    var tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    
    if (numeros.indexOf(tecla) == -1) {
        return false;
    
    } else {
        return true;
    }
    
    }
    
}
