import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar-empleado',
  templateUrl: './navbar-empleado.component.html',
  styleUrls: ['./navbar-empleado.component.css']
})
export class NavbarEmpleadoComponent implements OnInit {

  nombre = localStorage.getItem('nombre')
  constructor() { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

}
