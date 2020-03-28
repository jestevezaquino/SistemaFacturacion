import { Component, ViewChild, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  productos:any = [];
  displayedColumns: string[] = ['Id', 'Nombre', 'Precio'];
  dataSource:any;

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.obtenerProductos();
  }

  //Obtener los productos desde la API y pasarselos al DataSource.
  obtenerProductos(){
    this.MS.obtenerProductos().subscribe((data:any)=>{
      this.productos = data;
      this.dataSource.data= this.productos;
    })
  }
}
