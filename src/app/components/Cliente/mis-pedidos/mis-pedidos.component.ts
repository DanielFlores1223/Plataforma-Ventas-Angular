import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell } from 'pdfmake-wrapper';
//servicio
import {PedidoService} from '../../../services/pedido.service';
import {InventarioService} from '../../../services/inventario.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  p = 1

  filtros = {
    correoCli : '',
    id: '',
    estatus: ''
  }

  pedidos;

  pedidoC;

  productosInfo = [{
    cantidadProd : 0,
    monto : 0,
    total : 0,
    nombreProd :'',
    precio : 0
  }];

  pedidoCancelar = {
    id : '',
    estatus: 'Cancelado'
  }


  idActual = '';
  totalPActual = 0;
  exito = 0;

  constructor(private pedidoService : PedidoService, private productoService : InventarioService) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultarPedidosDifCa(){
    this.filtros.correoCli = localStorage.getItem('correo');
    this.pedidoService.consultarPedidosDifCa(this.filtros).subscribe(res => {
      this.pedidos = res;
    },
    err => {
      console.log(err);
    })
  }

  pdf(){       
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A5');
 
    new Img('../assets/img/logo_crem_adap.png').alignment('center').height(80).width(80).build().then( img => {
    pdf.add( img );
    pdf.add(
      new Columns(['Codigo de la venta: ', this.pedidoC._id]).fontSize(12).margin([0,10,0,0]).end
    )
    pdf.add(
      new Columns(['Fecha de entrega: ', this.pedidoC.fechaEntrega.substring(0,10)]).fontSize(12).margin([0,10,0,0]).end
    )

    pdf.add(
      new Columns(['Estatus: ', this.pedidoC.estatus]).fontSize(12).margin([0,10,0,0]).end
    )

    pdf.add(
      new Columns(['Nombre del cliente: ', this.pedidoC.cliente.nombre + " "+ this.pedidoC.cliente.apellidos]).fontSize(12).margin([0,10,0,0]).end
    )

    pdf.add(
      new Txt('Productos del pedido').bold().alignment("center").fontSize(14).margin([0,10,0,0]).end
    )


    pdf.add(
      new Columns(['Producto','Precio','Cantidad','monto']).fontSize(12).margin([0,10,0,0]).bold().background('#F9E79F').alignment('center').end
    )
    for (let i = 0; i < this.pedidoC.tiene.length; i++) { 
      pdf.add(
        new Columns([this.productosInfo[i].nombreProd,'$' +this.productosInfo[i].precio ,this.productosInfo[i].cantidadProd,'$' +this.productosInfo[i].monto]).fontSize(10).margin([0,10,0,0]).alignment('center').end
      ) 
    }

    pdf.add(
      new Txt('Total: $' + this.pedidoC.total).bold().alignment("right").fontSize(14).margin([0,20,0,0]).end
    )


    pdf.create().open();
  });
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
      //console.log('termino de llenarse, el resultado es:');
      //console.log(this.productosInfo);
    },err => {
      console.log(err);
    })
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

  obtenerId(id){
    this.idActual = id
  }

  cancelarPedido(){
    this.exito = 3;
    this.pedidoCancelar.id = this.idActual;

    console.log(this.pedidoCancelar.id);
    this.pedidoService.modificarEstatusPedido(this.pedidoCancelar).subscribe(res => {
      this.exito = 1
      this.consultarPedidosDifCa()
    },
    err => {
      this.exito = 2
      console.log(err)});
  }

  consultar(){
    if(this.filtros.estatus == '')
      this.consultarPedidosDifCa();
    else
    this.buscarPedidoEstatus();
  }

  buscarPedidoEstatus(){
    this.filtros.correoCli = localStorage.getItem('correo');

    this.pedidoService.consultarPedidosEstatusCliente(this.filtros).subscribe(res => {
      this.pedidos = res;
    },
    err => console.log(err))
  }

}
