import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
//servicios
import { LoginService } from '../../../services/login.service';
import {PedidoService} from '../../../services/pedido.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService : LoginService, private rutas : Router, private pedidoService : PedidoService) { }
  tipo;
  entro = false;
  carrito;
  filtrosCarrito = {
    correoCli : ''
  }
  items = 0;

  ngOnInit(): void {
    this.loginService.change.subscribe(isOpen => {
      this.entro = isOpen;
    });

    this.loginService.change1.subscribe(isOpen =>{
      this.tipo = isOpen;
    });

    this.entro = this.loginService.loginExito();
    this.tipo = this.loginService.tipoUsu();

    if (this.entro && this.tipo == 'Cliente') {
      this.consultarCarrito();
    
    }
    

    
  }

  

  cerrarSesion(){
    //elimina las variables del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('tipo');
    localStorage.removeItem('correo')
    this.entro = this.loginService.loginExito();
    this.rutas.navigate(['/inicio']);
  }


  consultarCarrito(){
    this.filtrosCarrito.correoCli = localStorage.getItem('correo');

    this.pedidoService.buscarPedidoCarrito(this.filtrosCarrito).subscribe(res => {
      console.log(res);
      this.carrito = res;
      this.obtnerCantidadItems();
    },err => {
      console.log(err);
    })
  }

  obtnerCantidadItems(){
    this.items = 0;
    for (let i = 0; i < this.carrito.tiene.length; i++) {
      this.items += this.carrito.tiene[i].cantidadProd;  
    }
}

}
