import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  Form:FormGroup;
  producto:any;
  productosDB:any = [];
  noDisponible:boolean;

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
    private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['',[Validators.required]],
      nombre : ['',[Validators.required, Validators.minLength(3)]],
      precio: ['',[Validators.required, this.controlCantidadValidator]]
    });

    this.MS.obtenerProductos().subscribe((datos:any)=>{
      this.productosDB = datos;
    });

    this.Form.controls.nombre.disable();
    this.Form.controls.precio.disable();

    this.noDisponible = false;
  }

  //Custom validator para controlar el precio
  controlCantidadValidator(control: AbstractControl) : {[key:string]:boolean} | null {

    if (control.value !== undefined && (isNaN(control.value) || control.value <= 0 || control.value > 999999.99)) {
      return { 'priceRange': true };
    }
    return null;
  }

  limpiarForm(){
    this.Form.reset();
    this.noDisponible = false;
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de querer editar este producto?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.MS.obtenerProductoPorNombre(this.Form.controls.nombre.value).subscribe((data:any)=>{
          if(data.nombre == 'NOT FOUND'){
            this.editarProducto();
          } else{
            if(data.productoID == this.Form.controls.id.value)
            {
              this.editarProducto();
            }else
            {
              this.noDisponible = true;
            }
          }
        });
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se edito el producto correctamente.'
    });
  }

  actualizarDatos(){
    const productoID = this.Form.controls.id.value;

    this.MS.obtenerProductoPorID(productoID).subscribe((prod:any)=>{
      this.Form.controls.nombre.setValue(prod.nombre);
      this.Form.controls.nombre.enable();
      this.Form.controls.precio.setValue(prod.precio);
      this.Form.controls.precio.enable();
    });
  }

  editarProducto(){
    const productoID = this.Form.controls.id.value;
    const nombre = this.Form.controls.nombre.value;
    const precio = (this.Form.controls.precio.value).toFixed(2);

    this.producto = {
      productoID: productoID,
      nombre: nombre,
      precio: precio
    }

    //Editar un producto de la BD mediante el uso de la API.
    this.MS.editarProducto(this.producto).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
    }, error => {
      console.log(error);
    });
  }
}
