import { Component, OnInit } from '@angular/core';
//servicio
import {PedidoService} from '../../../services/pedido.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private pedidoService : PedidoService) { }

  ngOnInit(): void {
  }

}
