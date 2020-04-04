import { Component,ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { ProcesosService } from 'src/services/procesos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  Form:FormGroup;
  arrayProductos:any = [];
  arrayProveedores:any = [];
  arrayEntradas:any = [];
  noValido:boolean;

  displayedColumns: string[] = ['Id', 'Producto', 'Cantidad', 'Proveedor', 'Fecha', 'Opciones'];
  dataSource:any;

  constructor(private formBuilder:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar, private MS:MantenimientoService, private PS:ProcesosService) { }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.pattern('[0-9]*'), this.controlCantidadValidator]],
      proveedor: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });

    this.MS.obtenerProductos().subscribe((data)=>{
      this.arrayProductos = data;
    });

    this.MS.obtenerProveedores().subscribe((data)=>{
      this.arrayProveedores = data;
    });

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.obtenerEntradas();

    this.noValido = false;
  }

  //Custom validator para controlar el precio
  controlCantidadValidator(control: AbstractControl) : {[key:string]:boolean} | null {

    if (control.value <= 0 || control.value.toString().includes('.') == true){
      return { 'priceRange': true };
    }
    return null;
  }

  limpiar(){
    this.Form.reset();
    this.noValido = false;
  }

  openDialog(id:number):void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: 'Al borrar esta entrada, estaras eliminando automaticamente la cantidad de este producto en la tabla stock y/o eliminandolo si cantidad de producto en entrada > cantidad de producto en stock. ¿Estás seguro de querer eliminar esta entrada?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.eliminarEntrada(id);
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se agrego la entrada correctamente.'
    });
  }

  obtenerEntradas(){
    this.PS.obtenerEntradas().subscribe((data:any)=>{
      this.arrayEntradas = data;
      this.dataSource.data= this.arrayEntradas;
    });
  }

  agregarEntrada(){
    const productoID = this.Form.controls.producto.value;
    const cantidad = this.Form.controls.cantidad.value;
    const proveedorID = this.Form.controls.proveedor.value;
    const fecha = this.Form.controls.fecha.value;

    this.PS.obtenerEntradasProductoProveedor(productoID, proveedorID).subscribe((data)=>{
      let entrada:any =
        {
          productoID: productoID,
          cantidad: cantidad,
          proveedorID: proveedorID,
          fecha: fecha
        }

        this.PS.agregarEntrada(entrada).subscribe((request)=>{
          this.openSnackBar();
          this.limpiar();
          this.ngOnInit();
        });
    })
  }

  eliminarEntrada(id:number)
  {
    this.PS.eliminarEntrada(id).subscribe((request)=>{
        this.ngOnInit();
    });
  }
}
