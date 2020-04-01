import { Component, ViewChild, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ver-proveedores',
  templateUrl: './ver-proveedores.component.html',
  styleUrls: ['./ver-proveedores.component.css']
})
export class VerProveedoresComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  proveedores:any = [];
  displayedColumns: string[] = ['Id', 'Cedula', 'Nombre', 'Telefono', 'Email'];
  dataSource:any;

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.obtenerProveedores();
  }

  //Obtener los productos desde la API y pasarselos al DataSource.
  obtenerProveedores(){
    this.MS.obtenerProveedores().subscribe((data:any)=>{
      this.proveedores = data;
      this.dataSource.data= this.proveedores;
    });
  }
}
