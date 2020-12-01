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

  isCheck=false;
  byDate;
  pedidos;

  dateHoy = new Date();

  //dateHoy: number = Date.now();

  noPedidos=0;
  
  total=0;
  filtro="Todos";
  tipo="Total";

  periodo =["dia","semana","mes","anio"];

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

  constructor(private pedidoService : PedidoService, private productoService : InventarioService) {
   }

  ngOnInit(): void {
    this.totalPedidos()

  }

  totalPedidos(){
    this.pedidoService.consultarTodo().subscribe(res =>{
      this.pedidos=res;
      for(let j=0;j<this.pedidos.length;j++){
        if(this.pedidos[j].estatus!="en carrito"){
          this.noPedidos++;
        }
      }
      //this.noPedidos=this.pedidos.length;
      for(let i=0;i<this.pedidos.length;i++){
        //if(this.pedidos[i]!=null){
        if(this.pedidos[i].estatus!="en carrito"){
          if(this.pedidos[i].estatus!="Cancelado"){
            this.total+=this.pedidos[i].total;
          }
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

  buscar(){
    if(this.tipo=="Total"){
      console.log('La variable es: '+this.tipo)
    }
    else{
      console.log("Saludos perro"+this.tipo);
    }
  }

  Ctrl($scope){ 
    $scope.date = new Date(); 
  } 

  actualizar(){
    this.total=0;
    this.noPedidos=0;
    // it could be some trouble here, just be careful
    if(this.filtro!="Todos"){
      for(let i=0;i<this.pedidos.length;i++){
        if(this.pedidos[i].estatus==this.filtro){
          this.noPedidos++;
          if(this.pedidos[i]!=null){
            this.total+=this.pedidos[i].total;
          }
        }
      }
    }else{
      for(let i=0;i<this.pedidos.length;i++){
        if(this.pedidos[i].estatus!="en carrito"){
          this.noPedidos++;
        }
        if(this.pedidos[i].estatus!="Cancelado"){
          this.total+=this.pedidos[i].total;
        }
      }
    }
  }

  changeStatus(){
    if(this.isCheck==true){
      this.isCheck=false;
    }else{
      this.isCheck=true;
    }
  }

  generarPDF(){
    console.log(this.dateHoy);
    //var fecha_nueva='fecha: '+this.dateHoy.getDay()+'/'+this.dateHoy.getMonth()+'/'+this.dateHoy.getUTCFullYear();
    var fecha_nueva= this.dateHoy.toString();
    console.log(fecha_nueva)
    var num=0;       
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A5');
    //'fecha: '+this.dateHoy.getDay()+'/'+date.getMonth()+'/'+date.getUTCFullYear()
    pdf.add(
      new Txt(fecha_nueva).bold().alignment('right').fontSize(5).margin([0,5,0,0]).end
    )
    
    new Img('../assets/img/logo_crem_adap.png').alignment('center').height(80).width(80).build().then( img => {
    pdf.add( img );
    
    pdf.add(
      pdf.ln(2)
    );//saltos de linea
    pdf.add(
      new Txt('Reporte de Pedidos').alignment('center').fontSize(15).bold().end
    );
    pdf.add(pdf.ln());
    
    if(this.filtro=="Todos"){
      
      for(let i=0;i<this.pedidos.length;i++){

        if(this.pedidos[i].estatus!="en carrito"){

          num++;

          pdf.add(
            new Txt("Pedido no° "+num.toString()).alignment('left').fontSize(10).bold().end
          );

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
      }
    }else{
      //aqui imprime dependiendo el filtro
      for(let k=0;k<this.pedidos.length;k++){
        
        if(this.pedidos[k].estatus==this.filtro){

          num++;

          pdf.add(
            new Txt("Pedido no° "+num.toString()).alignment('left').fontSize(10).bold().end
          );

          pdf.add(
            new Table([
              [ new Txt('Estatus').bold().end,
              new Txt('Metodo de pago').bold().end,
              new Txt('Direccion').bold().end,
              new Txt('Fecha entrega').bold().end],
              [ new Columns([this.pedidos[k].estatus]).end,
              new Columns([this.pedidos[k].metodoPago]).end,
              new Columns([this.pedidos[k].direccionEnvio]).end,
              new Columns([this.pedidos[k].fechaEntrega]).fontSize(10).end]
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
  
          console.log(this.pedidos[k].tiene);
          for (let j = 0; j < this.pedidos[k].tiene.length; j++) {
            pdf.add(
              new Columns(
                [ this.pedidos[k].tiene[j].codigoProd,
                this.pedidos[k].tiene[j].precioProd,
                this.pedidos[k].tiene[j].cantidadProd,
                this.pedidos[k].tiene[j].monto
              ]).fontSize(10).alignment('left').end
            )
          }
          pdf.add(
            new Txt('Total: $' + this.pedidos[k].total).bold().alignment("right").fontSize(14).margin([0,20,0,0]).end
          )
          pdf.add(
            pdf.ln(4)
          );

        }
      }
    }
    pdf.create().download();

    pdf.create().open();
  });
}

}
