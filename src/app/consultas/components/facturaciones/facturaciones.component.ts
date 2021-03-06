import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProcesosService } from 'src/services/procesos.service';
import { ConsultasService } from 'src/services/consultas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-facturaciones',
  templateUrl: './facturaciones.component.html',
  styleUrls: ['./facturaciones.component.css']
})

export class FacturacionesComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Cliente', 'Descripcion', 'CantidadVendida', 'Subtotal', 'Descuento', 'Total', 'Fecha'];
  dataSource:any;
  entradas:any;
  form:FormGroup;
  opcionesForm:FormGroup;
  stats:any=null;

  radioBtnValue:string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private PS:ProcesosService, private CS:ConsultasService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      opcion: ['']
    });

    this.opcionesForm = this.fb.group({
      sumatoria: [''],
      conteo: [''],
      promedio: [''],
      max: [''],
      min: ['']
    });

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obtenerFacturas();
  }

  obtenerFacturas(){
    this.PS.obtenerFacturas().subscribe((fts:any)=>{
      this.entradas = fts;
      this.dataSource.data= this.entradas;
    });
  }

  setFilterColumn(event: MatRadioChange){
    switch(event.value){
      case 'fecha':
        this.dataSource.filterPredicate = (data:any, filter:string) => data.fecha.trim().toLowerCase().indexOf(filter) != -1;
        break;
      case 'cliente':
        this.dataSource.filterPredicate = (data:any, filter:string) => data.cliente.nombre.trim().toLowerCase().indexOf(filter) != -1;
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.stats = null;

    this.CS.obtenerStats('facturaciones',this.form.controls.opcion.value,filterValue.trim().toLowerCase()).subscribe((data:any)=>{
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
