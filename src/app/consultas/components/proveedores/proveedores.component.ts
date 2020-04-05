import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from 'src/services/consultas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Cedula', 'Nombre', 'Telefono', 'Email'];
  dataSource:any;
  proveedores:any;
  form:FormGroup;

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
    this.obtenerProveedores();
  }

  obtenerProveedores(){
    this.MS.obtenerProveedores().subscribe((data:any)=>{
      this.proveedores = data;
      this.dataSource.data= this.proveedores;
    });
  }

  setFilterColumn(event: MatRadioChange){
    switch(event.value){
      case 'nombre':
        this.dataSource.filterPredicate = (data:any, filter:string) => data.nombre.trim().toLowerCase().indexOf(filter) != -1;
        break;
      case 'email':
        this.dataSource.filterPredicate = (data:any, filter:string) => data.email.trim().toLowerCase().indexOf(filter) != -1;
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

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
