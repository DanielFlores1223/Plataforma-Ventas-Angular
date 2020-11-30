import { Component, OnInit } from '@angular/core';

//librerias para generar PDF
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell } from 'pdfmake-wrapper';
//servicos de reporte 
import {PedidoService} from '../../../services/pedido.service';
import {ClienteService} from '../../../services/cliente.service';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  pedidos;

  noPedidos;

  total=0;


  filtros = {
    nombre : "",
    categoria : "Todo",
    subCategoria : "Todos"
  }

  productosInfo = [{
    cantidadProd : 0,
    monto : 0,
    total : 0,
    nombreProd :'',
    precio : 0
  }];

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

  constructor(private pedidoService : PedidoService, private productoService : InventarioService) { }

  ngOnInit(): void {
    this.totalPedidos()

  }

  totalPedidos(){
    this.pedidoService.consultarTodo().subscribe(res =>{
      this.pedidos=res;
      this.noPedidos=this.pedidos.length;
      for(let i=0;i<this.noPedidos;i++){
        if(this.pedidos[i]!=null){
          this.total+=this.pedidos[i].total;
        }
      }
    },
    err => console.log(err));
    
  }

  consultarProd(codigo){
    this.productoB.codigo = codigo;

    this.productoService.buscarCodigo(this.productoB).subscribe(res => {
      this.productoB = res
    }, 
    err => console.log(err));
  }

  infoReporte(){

  }

  generarPDF(){       
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A5');
    
    new Img('../assets/img/logo_crem_adap.png').alignment('center').height(80).width(80).build().then( img => {
    pdf.add( img );
    
    pdf.add(
      pdf.ln(2)
    );//saltos de linea
    pdf.add(
      new Txt('Reporte de Pedidos').alignment('center').fontSize(15).bold().end
    );
    pdf.add(pdf.ln());
    for(let i=0;i<this.noPedidos;i++){

      pdf.add(
        new Table([
          [ new Txt('Estatus').bold().end,
          new Txt('Metodo de pago').bold().end,
          new Txt('Direccion').bold().end,
          new Txt('Fecha entrega').bold().end],
          [ new Columns([this.pedidos[i].estatus]).end,
          new Columns([this.pedidos[i].metodoPago]).end,
          new Columns([this.pedidos[i].direccionEnvio]).end,
          new Columns([this.pedidos[i].fechaEntrega]).fontSize(10).end]
        ]).end
      )
  
      pdf.add(
        new Txt('Productos del pedido').bold().alignment('left').fontSize(12).margin([0,5,0,0]).end
      )
  
      pdf.add(
        new Columns(
          ['Codigo',
          'Precio',
          'Cantidad',
          'Monto']).fontSize(12).margin([0,10,0,0]).bold().alignment('left').end
        
      )
      console.log(this.pedidos[i].tiene);
      for (let j = 0; j < this.pedidos[i].tiene.length; j++) {

        /*pdf.add(
          new Table([
            [new Columns([this.pedidos[i].tiene[j].codigoProd]).end,
            new Columns([this.pedidos[i].tiene[j].precioProd]).end,
            new Columns([this.pedidos[i].tiene[j].cantidadProd]).end,
            new Columns([this.pedidos[i].tiene[j].monto]).end
          ]
          ]).end
        );*/
        pdf.add(
          new Columns(
            [ this.pedidos[i].tiene[j].codigoProd,
            this.pedidos[i].tiene[j].precioProd,
            this.pedidos[i].tiene[j].cantidadProd,
            this.pedidos[i].tiene[j].monto
          ]).fontSize(10).alignment('left').end
        )
      }
      pdf.add(
        new Txt('Total: $' + this.pedidos[i].total).bold().alignment("right").fontSize(14).margin([0,20,0,0]).end
      )
      pdf.add(
        pdf.ln(4)
      );
    }

    pdf.create().download();

    pdf.create().open();
  });
}

}
