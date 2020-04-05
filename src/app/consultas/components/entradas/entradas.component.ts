import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProcesosService } from 'src/services/procesos.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Producto', 'Cantidad', 'Proveedor', 'Fecha', 'Opciones'];
  dataSource:any;
  entradas:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private PS:ProcesosService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerEntradas();
    this.dataSource.filterPredicate = (data:any, filter:string) => data.nombre.trim().toLowerCase().indexOf(filter) != -1;
  }

  obtenerEntradas(){
    this.PS.obtenerEntradas().subscribe((ents:any)=>{
      this.entradas = ents;
      this.dataSource.data= this.entradas;
    });
  }

  filtrar(busqueda:string)
  {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
