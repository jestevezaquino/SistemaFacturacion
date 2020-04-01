import { Component, ViewChild, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  proveedores:any = [];
  displayedColumns: string[] = ['Id', 'Cedula', 'Nombre', 'Telefono', 'Email', 'Categoria'];
  dataSource:any;

  constructor(private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.obtenerClientes();
  }

  //Obtener los clientes desde la API y pasarselos al DataSource.
  obtenerClientes(){
    this.MS.obtenerClientes().subscribe((data:any)=>{
      this.proveedores = data;
      this.dataSource.data= this.proveedores;
    });
  }
}
