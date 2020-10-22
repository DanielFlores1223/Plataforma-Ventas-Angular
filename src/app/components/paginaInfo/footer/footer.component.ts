import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio : Number;

  constructor() { }

  ngOnInit(): void {
    //obtenemos el año actual
    this.anio = new Date().getFullYear();
  }

}
