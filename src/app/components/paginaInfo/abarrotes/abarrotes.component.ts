import { Component, OnInit } from '@angular/core';
//servicio
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-abarrotes',
  templateUrl: './abarrotes.component.html',
  styleUrls: ['./abarrotes.component.css']
})
export class AbarrotesComponent implements OnInit {
  productos;

  filtros = {
    nombre : "",
    categoria : "Abarrotes",
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

  constructor(private prodService : InventarioService) { }

  ngOnInit(): void {
    this.consultar();
  }

  consultar(){
    if (this.filtros.subCategoria == 'Todos') 
      this.consultarCat();
    else
      this.consultarCatSub();
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

}
