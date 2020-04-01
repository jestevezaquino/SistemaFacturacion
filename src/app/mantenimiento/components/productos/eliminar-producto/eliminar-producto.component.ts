import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  Form:FormGroup;
  productosDB:any = [];

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
    private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['',[Validators.required]],
      nombre : ['',[Validators.required, Validators.minLength(3)]],
      precio: ['',[Validators.required]]
    });

    this.Form.controls.nombre.disable();
    this.Form.controls.precio.disable();

    this.MS.obtenerProductos().subscribe((datos:any)=>{
      this.productosDB = datos;
    });
  }

  limpiarForm(){
    this.Form.reset();
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de querer eliminar este producto?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.eliminarProducto();
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se elimino el producto correctamente.'
    });
  }

  actualizarDatos(){
    const productoID = this.Form.controls.id.value;

    this.MS.obtenerProductoPorID(productoID).subscribe((prod:any)=>{
      this.Form.controls.nombre.setValue(prod.nombre);
      this.Form.controls.precio.setValue(prod.precio);
    });
  }

  eliminarProducto(){
    const productoID = this.Form.controls.id.value;
    //Eliminar un producto  la BD mediante el uso de la API.
    this.MS.eliminarProducto(productoID).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }
}
