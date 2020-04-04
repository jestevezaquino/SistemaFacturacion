import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { ProcesosService } from 'src/services/procesos.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';

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

  datosFactura = { sumaImporte: 0, descuento: 0, subtotal: 0, itbis: 0, total: 0 }

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar, private MS:MantenimientoService, private PS:ProcesosService) { }

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
      disponible: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      cantidad: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });

    this.Form.controls.precio.disable();
    this.Form.controls.disponible.disable();
    this.Form.controls.cantidad.disable();
    (document.getElementById('btnF') as HTMLInputElement).disabled = true;
    this.control = false;

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.noDisponible = true;
  }

  obtenerTipoCliente(categoria:string){
    if(categoria == 'Premium'){
      this.datosFactura.descuento = 5;
    } else{
      this.datosFactura.descuento = 0;
    }
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

  openDialogEliminarCliente():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Al aceptar estará eliminando toda la configuracion y cambios en la factura del cliente actual. ¿Deseas continuar de todas formas?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.descartarFactura();
      }
    });
  }

  descartarFactura(){
    this.FormCliente.reset();
    this.Form.reset();
    this.Form.controls.cantidad.disable();
    (document.getElementById('btnF') as HTMLInputElement).disabled = true;
    this.FormCliente.controls.cliente.enable();
    (document.getElementById('btnCliente') as HTMLInputElement).disabled = false;
    this.control = false;
    this.ProductoStock = [];
    this.carritoCompras = [];
    this.datosFactura = { sumaImporte: 0, descuento: 0, subtotal: 0, itbis: 0, total: 0 }
    this.dataSource = new MatTableDataSource();
  }

  actualizarFormTabla(idProducto:number){
    for(let e in this.ProductoStock){
      if(this.ProductoStock[e].productoID == idProducto){
        this.Form.controls.precio.setValue(this.ProductoStock[e].producto.precio);
        this.Form.controls.disponible.setValue(this.ProductoStock[e].cantidad);
      }
    }
  }

  agregarAlCarrito()
  {
    if(this.Form.controls.disponible.value < this.Form.controls.cantidad.value)
    {
      this.control = false;
    }
    else
    {
      const productoID = this.Form.controls.producto.value;
      const precio = this.Form.controls.precio.value;
      const cantidad = this.Form.controls.cantidad.value;

      this.MS.obtenerProductoPorID(productoID).subscribe((data:any)=>{
        this.carritoCompras.push({
          productoID: productoID,
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

        this.datosFactura.sumaImporte += Number((cantidad*precio).toFixed(2));
        if(this.datosFactura.descuento == 5)
        {
          this.datosFactura.subtotal = Number((this.datosFactura.sumaImporte - (this.datosFactura.sumaImporte*0.05)).toFixed(2));
          this.datosFactura.itbis = Number((this.datosFactura.subtotal * 0.18).toFixed(2));
          this.datosFactura.total = Number((this.datosFactura.subtotal + this.datosFactura.itbis).toFixed(2));
        }
        else
        {
          this.datosFactura.subtotal = Number((this.datosFactura.sumaImporte).toFixed(2));
          this.datosFactura.itbis = Number((this.datosFactura.subtotal * 0.18).toFixed(2));
          this.datosFactura.total = Number((this.datosFactura.subtotal + this.datosFactura.itbis).toFixed(2));
        }
      });

      this.Form.reset();
      this.noDisponible = false;
      this.control = true;
    }
  }

  eliminarItem(prod:string){
    for(let e in this.carritoCompras){
      if(this.carritoCompras[e].producto == prod){

        this.datosFactura.sumaImporte -= Number((this.carritoCompras[e].cantidad*this.carritoCompras[e].precio).toFixed(2));
        if(this.datosFactura.descuento == 5)
        {
          this.datosFactura.subtotal = Number((this.datosFactura.sumaImporte - (this.datosFactura.sumaImporte*0.05)).toFixed(2));
          this.datosFactura.itbis = Number((this.datosFactura.subtotal * 0.18).toFixed(2));
          this.datosFactura.total = Number((this.datosFactura.subtotal + this.datosFactura.itbis).toFixed(2));
        }
        else
        {
          this.datosFactura.subtotal = Number((this.datosFactura.sumaImporte).toFixed(2));
          this.datosFactura.itbis = Number((this.datosFactura.subtotal * 0.18).toFixed(2));
          this.datosFactura.total = Number((this.datosFactura.subtotal + this.datosFactura.itbis).toFixed(2));
        }

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

  openDialogFacturar():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Está seguro de generar una factura con la configuracion actual?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.actualizarStock();
        this.agregarUnaFactura();
        this.openSnackBar();
        this.descartarFactura();
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se ha generado la factura exitosamente.'
    });
  }

  actualizarStock(){
    for(let e in this.carritoCompras){
      let stock = {
        productoID: this.carritoCompras[e].productoID,
        cantidad: this.carritoCompras[e].cantidad
      }

      this.PS.editarStock(stock).subscribe((data)=>{});
    }
  }

  agregarUnaFactura(){

    let descripcion = "Se facturo: ";
    let cantProductos = 0;

    for(let e in this.carritoCompras){
      descripcion += ""+this.carritoCompras[e].cantidad +" "+ this.carritoCompras[e].producto+", ";
      cantProductos += this.carritoCompras[e].cantidad;
    }

    descripcion = descripcion.substring(0, descripcion.length-2);
    descripcion += ".";

    let Factura = {
      ClienteID: this.FormCliente.controls.cliente.value,
	    Descripcion: descripcion,
	    CantidadProductos: cantProductos,
	    SubTotal: this.datosFactura.subtotal,
	    DescuentoPorciento: this.datosFactura.descuento,
	    Total: this.datosFactura.total,
	    Fecha: (new Date())
    }

    this.PS.agregarFactura(Factura).subscribe((request)=>{});
  }
}
