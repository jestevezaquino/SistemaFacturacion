import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  ventana:string;
  titulo:string;

  constructor() { }

  ngOnInit(){}

  abrirProductos(){
    this.ventana="productos";
    this.titulo="CRUD Productos"
  }

  abrirProveedores(){
    this.ventana="proveedores";
    this.titulo="CRUD Proveedores"
  }

  abrirClientes(){
    this.ventana="clientes";
    this.titulo="CRUD Clientes"
  }
}
