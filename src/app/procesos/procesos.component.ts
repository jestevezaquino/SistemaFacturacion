import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {

  proceso:string;

  constructor() { }

  ngOnInit(): void {

  }

  abrirEntradas(){
    this.proceso = 'entradas';
  }

  abrirStock(){
    this.proceso = 'stock';
  }

  abrirFacturacion(){
    this.proceso = 'facturacion';
  }
}
