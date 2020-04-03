import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { ProcesosService } from 'src/services/procesos.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['Producto', 'Precio', 'Cantidad', 'Opciones'];
  dataSource:any;

  FormCliente:FormGroup;
  arrayClientes:any = [];

  Form:FormGroup;
  control:boolean;
  ProductoStock:any = [];

  carritoCompras:any = [];
  noDisponible:boolean;

  constructor(private fb:FormBuilder, private MS:MantenimientoService, private PS:ProcesosService) { }

  ngOnInit(): void {

    this.MS.obtenerClientes().subscribe((data)=>{
      this.arrayClientes = data;
    });

    this.FormCliente = this.fb.group({
      cliente: ['', [Validators.required]]
    });

    this.Form = this.fb.group({
      producto: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      cantidad: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });

    this.Form.controls.precio.disable();
    this.Form.controls.cantidad.disable();
    (document.getElementById('btnF') as HTMLInputElement).disabled = true;
    this.control = false;

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.noDisponible = true;
  }

  agregarAlCarrito()
  {
    this.dataSource.data= this.carritoCompras;
    this.noDisponible = false;
  }

  turnOnFormFactura(){
    this.FormCliente.controls.cliente.disable();
    (document.getElementById('btnCliente') as HTMLInputElement).disabled = true;
    this.Form.controls.cantidad.enable();
    (document.getElementById('btnF') as HTMLInputElement).disabled = false;

    this.PS.obtenerStock().subscribe((data)=>{
      this.ProductoStock = data;
      this.control=true;
    });
  }

  cambiarCliente(){
    this.FormCliente.reset();
    this.Form.reset();
    this.Form.controls.cantidad.disable();
    (document.getElementById('btnF') as HTMLInputElement).disabled = true;
    this.FormCliente.controls.cliente.enable();
    (document.getElementById('btnCliente') as HTMLInputElement).disabled = false;
    this.ProductoStock = [];
    this.control = false;
  }

  actualizarFormTabla(idProducto:number){
    this.MS.obtenerProductoPorID(idProducto).subscribe((data:any)=>{
      this.Form.controls.precio.setValue(data.precio);
    });
  }
}