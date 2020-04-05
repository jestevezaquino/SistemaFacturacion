import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MantenimientoService } from 'src/services/mantenimiento.service';

export interface Producto{
  productoID:number,
  nombre:string,
  precio:string
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio'];
  dataSource:any;
  productos:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerProductos();
    this.dataSource.filterPredicate = (data:any, filter:string) => data.nombre.trim().toLowerCase().indexOf(filter) != -1;
  }

  obtenerProductos()
  {
    this.MS.obtenerProductos().subscribe((prod:any)=>{
      this.productos = prod;
      this.dataSource.data= this.productos;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
