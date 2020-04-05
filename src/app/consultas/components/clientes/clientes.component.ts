import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from 'src/services/consultas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

import * as html2pdf from 'html2pdf.js';
import { MantenimientoService } from 'src/services/mantenimiento.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Cedula', 'Nombre', 'Telefono', 'Email', 'Categoria'];
  dataSource:any;
  clientes:any;
  form:FormGroup;
  stats:any=null;

  radioBtnValue:string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private MS:MantenimientoService, private CS:ConsultasService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      opcion: ['']
    });

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.MS.obtenerClientes().subscribe((data:any)=>{
      this.clientes = data;
      this.dataSource.data= this.clientes;
    });
  }

  setFilterColumn(event: MatRadioChange){
    switch(event.value){
      case 'nombre':
        this.dataSource.filterPredicate = (data:any, filter:string) => data.nombre.trim().toLowerCase().indexOf(filter) != -1;
        break;
      case 'categoria':
        this.dataSource.filterPredicate = (data:any, filter:string) => data.categoria.trim().toLowerCase().indexOf(filter) != -1;
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.stats = null;

    this.CS.obtenerStats('clientes',this.form.controls.opcion.value,filterValue.trim().toLowerCase()).subscribe((data:any)=>{
      this.stats = data;
      console.log(this.stats);
    },(error:any)=>{
      console.clear();
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  imprimirConsulta(){
    const options = {
      name: 'consulta.js',
      image: {type:'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    }

    const element:Element = document.getElementById('imprimir');

    html2pdf()
      .from(element)
      .set(options)
      .save()
  }
}
