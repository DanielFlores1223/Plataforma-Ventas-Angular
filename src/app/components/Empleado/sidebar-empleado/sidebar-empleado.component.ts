import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar-empleado',
  templateUrl: './sidebar-empleado.component.html',
  styleUrls: ['./sidebar-empleado.component.css']
})
export class SidebarEmpleadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

}
