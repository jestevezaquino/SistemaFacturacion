import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  ventana:string;

  constructor() { }

  ngOnInit(){}

  abrirProductos(){
    this.ventana="productos";
  }
}
