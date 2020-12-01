import { Component, OnInit } from '@angular/core';
//servicio
import {PedidoService} from '../../../services/pedido.service';
import {InventarioService} from '../../../services/inventario.service';
import {EmpleadoService} from '../../../services/empleado.service';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos;
  pedidoC;
  
  pedidoCompletado;
  p = 1

  filtros = {
    correoCli : '',
    id: '',
    estatus: '',
    correoEmp: '',
    nombreEmp: '',
    apellidosEmp: '',
    telefonoEmp: ''
  }

  busquedaEmp = {
    correo : ''
  }

  busqueda ={
    nombre : '',
    estatus: ''
  }

  filtrosProd = {
    codigo: '',
    existencia : 0
  }

  productosInfo = [{
    cantidadProd : 0,
    monto : 0,
    total : 0,
    nombreProd: '',
    precio: 0
  }];
  
  idActual = '';
  totalPActual = 0;

  constructor(private pedidoService: PedidoService,  private productoService : InventarioService, private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar(){  
    if (this.busqueda.estatus == '' && this.busqueda.nombre != '') 
      this.consultarLike();
    else if (this.busqueda.estatus != '') 
      this.consultarLikeEstatus();
    else
      this.consultarTodo() 
  }

  consultarTodo(){
    this.pedidoService.consultarTodo().subscribe(res => {
      this.pedidos = res
    },
    err => console.log(err))
  }

  consultarLikeEstatus(){
    this.pedidoService.consultarLikeEstatus(this.busqueda).subscribe(res => {
      this.pedidos = res
    }, err => console.log(err))
  }

  consultarLike(){
    this.pedidoService.consultaLike(this.busqueda).subscribe(res => {
      this.pedidos = res
    }, err => console.log(err))
  }
  
  extraerInfoProd(){   
      for (let i = 0; i < this.pedidoC.tiene.length; i++) {
        this.productoService.buscarCodigoProdCarrito(this.pedidoC.tiene[i]).subscribe(res => {
          //console.log('Producto: ' + i)
          //console.log(res);
          this.productosInfo[i] = res;
          this.productosInfo[i].cantidadProd = this.pedidoC.tiene[i].cantidadProd;
          this.productosInfo[i].monto = this.pedidoC.tiene[i].monto;
    
        });    
      }     
     
  }

  consultarPedidoId(Id){
    this.filtros.id = Id;
    this.productosInfo = [{
      cantidadProd : 0,
      monto : 0,
      total : 0,
      nombreProd: '',
      precio: 0
    }];
    this.pedidoService.consultarIdPedido(this.filtros).subscribe(res => {
      this.pedidoC = res;
      this.totalPActual = res.total;
      this.extraerInfoProd();
    },err => {
      console.log(err);
    })
  }

  modificarEstatusPedido(estatus, id){
    this.filtros.estatus = estatus;
    this.filtros.id = id;

    if (this.filtros.estatus == 'Completado') 
      this.consultarPedidoCompletar(id) //este metodo resta los productos en la base de datos
    
    this.busquedaEmp.correo = localStorage.getItem('correo');
    this.empleadoService.consultarEmpCorreo(this.busquedaEmp).subscribe(res => {
      this.filtros.nombreEmp = res.nombre;
      this.filtros.apellidosEmp = res.apellidos;
      this.filtros.telefonoEmp = res.telefono;
      this.filtros.correoEmp = res.correo;
      this.modificarEst();
    },
    err => console.log(err));
   
  }

  modificarEst(){
    this.pedidoService.modificarEstatusPedido(this.filtros).subscribe(res => {
      this.buscar();
    },
    err => console.log(err))
  }

  consultarPedidoCompletar(Id){
    this.filtros.id = Id;
    this.pedidoService.consultarIdPedido(this.filtros).subscribe(res => {
      this.pedidoCompletado = res;
      this.totalPActual = res.total;
      this.restarExistencia()
      //console.log('termino de llenarse, el resultado es:');
      //console.log(this.productosInfo);
    },err => {
      console.log(err);
    })
  }

  restarExistencia(){   
    for (let i = 0; i < this.pedidoCompletado.tiene.length; i++) {
      this.productoService.buscarCodigoProdCarrito(this.pedidoCompletado.tiene[i]).subscribe(res => {
        this.filtrosProd.codigo = res.codigo;
        this.filtrosProd.existencia = Number(res.existencia) - Number(this.pedidoCompletado.tiene[i].cantidadProd)
        this.productoService.modificarExistencia(this.filtrosProd).subscribe(res => {

        },
        err => console.log(err))
      });    
    }     
   
}

eliminarPedido(){
  this.filtros.id = this.idActual;
  this.pedidoService.eliminarPedido(this.filtros).subscribe(res => {
    this.buscar();
  }, err => console.log(err))
}

obtenerId(id){
  this.idActual = id
}

}
