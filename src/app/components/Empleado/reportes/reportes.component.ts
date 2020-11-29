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

  filtros = {
    nombre : "",
    categoria : "Todo",
    subCategoria : "Todos"
  }

  constructor(private pedidoService : PedidoService) { }

  ngOnInit(): void {
    this.totalPedidos()

  }

  totalPedidos(){
    this.pedidoService.consultarTodo().subscribe(res =>{
      this.pedidos=res;
    },
    err => console.log(err));
  }

  generarPDF(){       
    const pdf = new PdfMakeWrapper();

    pdf.pageSize('A5');
 
    new Img('../assets/img/logo_crem_adap.png').alignment('center').height(80).width(80).build().then( img => {
    pdf.add( img );
    
    pdf.create().download();

    
    

    /*for (let i = 0; i < this.pedidoC.tiene.length; i++) { 
      pdf.add(
        new Columns([this.productosInfo[i].nombreProd,'$' +this.productosInfo[i].precio ,this.productosInfo[i].cantidadProd,'$' +this.productosInfo[i].monto]).fontSize(10).margin([0,10,0,0]).alignment('center').end
      ) 
    }

    pdf.add(
      new Txt('Total: $' + this.pedidoC.total).bold().alignment("right").fontSize(14).margin([0,20,0,0]).end
    )*/


    pdf.create().open();
  });
}

}
