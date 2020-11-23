import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//servicio
import { InventarioService } from '../../../services/inventario.service';
import { LoginService } from '../../../services/login.service';
import {PedidoService} from '../../../services/pedido.service';  
import {ClienteService} from '../../../services/cliente.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos;

  filtros = {
    nombre : "",
    categoria : "Todo",
    subCategoria : "Todos"
  }

  p = 1;

  productoB = {
    codigo : "",
    nombreProd : "",
    precio : 0,
    categoria : "",
    subCategoria : "",
    marca : "",
    descripcion : "",
    img : ""
  }

  //variables para carrito
  pedido = {
    total : '',
    metodoPago : '',
    direccionEnvio : '',
    fechaEntrega : '',
    estatus : 'en carrito',
    correoCli : '',
    nombreCli : '',
    apellidosCli : '',
    telefonoCli : '',
    codigoProd: '',
    precioProd : 0,
    cantidadProd : 0,
    monto : 0,
    id: ''
  }

  datosBusqueda = {
    correoCli : ''
  }

  cliente = {
    nombre : '',
    apellidos: '',
    telefono: '',
    correo: ''
  }

  pedidoEncontrado;

  exitoPedido = 0;

  productoPedido;

  pedidoBProd = {
    correoCli : '',
    codigoProd :''
  }

  exitoCarrito = 0;

  constructor(private loginService : LoginService, private rutas : Router, private prodService : InventarioService, private pedidoService : PedidoService, private clienteService : ClienteService) { }
  tipo;
  entro = false;

  ngOnInit(): void {
    this.consultar();

    this.loginService.change.subscribe(isOpen => {
      this.entro = isOpen;
    });

    this.loginService.change1.subscribe(isOpen =>{
      this.tipo = isOpen;
    });

    this.entro = this.loginService.loginExito();
    this.tipo = this.loginService.tipoUsu();

    if (this.entro) 
      this.buscarPedidoCarrito();
    
  }

  consultar(){
    if (this.filtros.categoria == 'Todo') 
      this.consultarTodo();
    else{
      if (this.filtros.subCategoria == 'Todos') 
        this.consultarCat();
      else
        this.consultarCatSub();
    }
  }

  consultarCatSub(){
    this.prodService.buscarLikeCatSub(this.filtros).subscribe(res => {
      this.productos = res;
      //console.log(this.productos)
    }, 
    err => console.log(err));
  }

  consultarCat(){
    this.prodService.buscarLikeCatInv(this.filtros).subscribe(res => {
      this.productos = res;
    },
    err => console.log(err));
  }

  consultarProd(codigo){
    this.productoB.codigo = codigo;

    this.prodService.buscarCodigo(this.productoB).subscribe(res => {
      this.productoB = res
    }, 
    err => console.log(err));
  }

  consultarTodo(){
    this.prodService.buscarTodoSA(this.filtros).subscribe(res => {
      this.productos = res
    }, 
    err => console.log(err));
  }

   //Funciones para agregar al carrito
   agregarCarrito(codigoProd, precioProd){
    this.pedido.codigoProd = codigoProd;
    this.pedido.precioProd = precioProd;
    this.pedido.cantidadProd = 1;
    this.pedido.monto = precioProd * this.pedido.cantidadProd;
    this.pedidoBProd.correoCli = localStorage.getItem('correo');
    this.pedidoBProd.codigoProd = codigoProd;

    this.buscarPedidoCarrito();
    
    if (this.pedidoEncontrado) {      
      this.pedido.id = this.pedidoEncontrado._id
      //console.log('hay pedido registrado')

      this.pedidoService.buscarProductoCarrito(this.pedidoBProd).subscribe(res => {
        this.productoPedido = res;
        //console.log('hice la peticion')
        
        if (this.productoPedido) {
          //console.log('sumar productos')
          //console.log(this.productoPedido);
          for (let i = 0; i < this.productoPedido.length; i++) {
              if (this.productoPedido[i].codigoProd == this.pedidoBProd.codigoProd) {
                //console.log('encontre esto: ');
                  //console.log(this.productoPedido[i]);
                  this.productoPedido[i].cantidadProd++;
                  this.productoPedido[i].monto = this.productoPedido[i].cantidadProd * this.productoPedido[i].precioProd;
                  //console.log(this.productoPedido[i]);
                  this.modificarProductoPedido(this.productoPedido[i]);
              }
            
          }
        }
      }, err => {
        //console.log('no hay')
        this.agregarProductoPedido();
      });
      
    }else{
      //llenamos los datos del cliente
      this.cliente.correo = localStorage.getItem('correo');
      this.clienteService.consultarCliCorreo(this.cliente).subscribe(res => {
        this.cliente = res
        //llenamos la informacion del cliente en el pedido
        this.pedido.nombreCli = this.cliente.nombre;
        this.pedido.apellidosCli = this.cliente.apellidos;
        this.pedido.correoCli = this.cliente.correo;
        this.pedido.telefonoCli= this.cliente.telefono;

        //registramos el pedido
        this.regPedido();
      },
      err => console.log(err));
    }

  }

  regPedido(){
    this.pedidoService.regPedido(this.pedido).subscribe(res => {
      //console.log('se agrego al carrito')
      this.buscarPedidoCarrito();
    },
    err => {
      //console.log(err);
    });
  }

  buscarPedidoCarrito(){
    this.datosBusqueda.correoCli = localStorage.getItem('correo');

    this.pedidoService.buscarPedidoCarrito(this.datosBusqueda).subscribe(res => {
      this.pedidoEncontrado = res;
    }, 
    err => {
      //console.log(err);
    })
  }

  agregarProductoPedido(){
    this.exitoCarrito = 3; //activa el spinner
    this.pedidoService.agregarProducto(this.pedido).subscribe(res => {
      //console.log('se agrego un producto al pedido');
      this.exitoCarrito = 1;
    },
    err => {
      //console.log(err);
    })
  }

  modificarProductoPedido(informacion){
    this.exitoCarrito = 3; 
    this.pedidoService.modificarProducto(informacion).subscribe(res => {
      this.exitoCarrito = 2;
      //console.log('se agrego cantidad al producto');
    }, err => console.log(err))
  }

  reiniciarExitoCarrito(){
    this.exitoCarrito = 0;
  }
}

