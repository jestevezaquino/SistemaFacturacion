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
  displayedColumns: string[] = ['Producto', 'Precio', 'Cantidad', 'Importe', 'Opciones'];
  dataSource:any;

  FormCliente:FormGroup;
  arrayClientes:any = [];

  Form:FormGroup;
  control:boolean;
  ProductoStock:any = [];
  respaldoProductoStock:any = [];

  carritoCompras:any = [];
  noDisponible:boolean;
  contador:number = 0;

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

  turnOnFormFactura(){
    this.FormCliente.controls.cliente.disable();
    (document.getElementById('btnCliente') as HTMLInputElement).disabled = true;
    this.Form.controls.cantidad.enable();

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
    this.control = false;
    this.ProductoStock = [];
    this.dataSource = new MatTableDataSource();
  }

  actualizarFormTabla(idProducto:number){
    this.MS.obtenerProductoPorID(idProducto).subscribe((data:any)=>{
      this.Form.controls.precio.setValue(data.precio);
    });
  }

  agregarAlCarrito()
  {
    const productoID = this.Form.controls.producto.value;
    const precio = this.Form.controls.precio.value;
    const cantidad = this.Form.controls.cantidad.value;
    this.contador = this.contador+1;

    this.MS.obtenerProductoPorID(productoID).subscribe((data:any)=>{
      this.carritoCompras.push({
        producto: data.nombre,
        precio: precio,
        cantidad: cantidad,
        importe: cantidad*precio
      });
      this.dataSource.data = this.carritoCompras;

      for(let e in this.ProductoStock){
        if(this.ProductoStock[e].producto.nombre == data.nombre){
          this.respaldoProductoStock.push(this.ProductoStock[e]);
          this.ProductoStock.splice(e, 1);
        }
      }
    });
    this.Form.reset();
    this.noDisponible = false;;
  }

  eliminarItem(prod:string){
    for(let e in this.carritoCompras){
      if(this.carritoCompras[e].producto == prod){
        this.carritoCompras.splice(e, 1);
      }
    }

    for(let e in this.respaldoProductoStock){
      if(this.respaldoProductoStock[e].producto.nombre == prod){
        this.ProductoStock.push(this.respaldoProductoStock[e]);
        this.respaldoProductoStock.splice(e, 1);
      }
    }
    this.dataSource.data = this.carritoCompras;
  }
}
