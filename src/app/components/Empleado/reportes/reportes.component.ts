import { Component, OnInit } from '@angular/core';

//librerias para generar PDF
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell } from 'pdfmake-wrapper';
//servicos de reporte 
import {PedidoService} from '../../../services/pedido.service';
import {ClienteService} from '../../../services/cliente.service';
import { InventarioService } from '../../../services/inventario.service';
import { LoginService } from '../../../services/login.service';

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
      console.log(this.total);
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
    
    //pdf.create().download();

    for(let i=0;i<this.noPedidos;i++){

      pdf.add(
        new Columns(['Total del Pedido: ', this.pedidos[i].total]).fontSize(12).margin([0,10,0,0]).end
      )
      pdf.add(
        new Columns(['Metodo de pago: ', this.pedidos[i].metodoPago]).fontSize(12).margin([0,10,0,0]).end
      )
  
      pdf.add(
        new Columns(['Direccion: ', this.pedidos[i].estatus]).fontSize(12).margin([0,10,0,0]).end
      )
  
      pdf.add(
        new Columns(['Fecha entrega: ', this.pedidos[i].fechaEntrega]).fontSize(12).margin([0,10,0,0]).end
      )
  
      pdf.add(
        new Columns(['Estatus: ', this.pedidos[i].metodoPago]).fontSize(12).margin([0,10,0,0]).end
      )
  
      pdf.add(
        new Txt('Productos del pedido').bold().alignment("center").fontSize(14).margin([0,10,0,0]).end
      )
  
      pdf.add(
        new Columns(['Producto','Precio','Cantidad','monto']).fontSize(12).margin([0,10,0,0]).bold().background('#F9E79F').alignment('center').end
      )
      for (let j = 0; j < this.pedidos[i].tiene.length; j++) {

        pdf.add('--Producto INFO--');
        /*pdf.add(
          new Columns([this.productosInfo[j].nombreProd,'$' +this.productosInfo[j].precio ,this.productosInfo[j].cantidadProd,'$' +this.productosInfo[j].monto]).fontSize(10).margin([0,10,0,0]).alignment('center').end
        )*/
      }
      pdf.add(
        new Txt('Total: $' + this.pedidos[i].total).bold().alignment("right").fontSize(14).margin([0,20,0,0]).end
      )
    }

    pdf.create().download();

    pdf.create().open();
  });
}

}
