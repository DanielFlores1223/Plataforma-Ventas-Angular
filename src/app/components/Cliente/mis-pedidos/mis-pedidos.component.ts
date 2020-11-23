import { Component, OnInit } from '@angular/core';
//servicio
import {PedidoService} from '../../../services/pedido.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  constructor(private pedidoService : PedidoService) { }

  ngOnInit(): void {
  }

}
