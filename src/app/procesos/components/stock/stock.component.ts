import { Component,ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProcesosService } from 'src/services/procesos.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['Id', 'Producto', 'Cantidad', 'Proveedores', 'Fecha'];
  dataSource:any;

  arrayStock:any = [];

  constructor(private PS:ProcesosService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.obtenerStock();
  }

  obtenerStock()
  {
    this.PS.obtenerStock().subscribe((data:any)=>{
      this.arrayStock = data;
      this.dataSource.data= this.arrayStock;
    });
  }
}
