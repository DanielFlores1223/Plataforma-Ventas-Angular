import { Component, OnInit } from '@angular/core';
//librerias para generar PDF
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  //PdfMakeWrapper.setFonts(pdfFonts);

  constructor() { }

  ngOnInit(): void {
  }

}
