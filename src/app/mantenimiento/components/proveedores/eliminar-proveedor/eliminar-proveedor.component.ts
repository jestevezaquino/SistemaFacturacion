import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-eliminar-proveedor',
  templateUrl: './eliminar-proveedor.component.html',
  styleUrls: ['./eliminar-proveedor.component.css']
})
export class EliminarProveedorComponent implements OnInit {

  Form:FormGroup;
  proveedoresDB:any = [];

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
    private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['',[Validators.required]],
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.Form.controls.cedula.disable();
    this.Form.controls.nombre.disable();
    this.Form.controls.telefono.disable();
    this.Form.controls.email.disable();

    this.MS.obtenerProveedores().subscribe((datos:any)=>{
      this.proveedoresDB = datos;
    });
  }

  limpiarForm(){
    this.Form.reset();
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de querer eliminar este proveedor?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.eliminarProveedor();
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se elimino el proveedor correctamente.'
    });
  }

  actualizarDatos(){
    const proveedorID = this.Form.controls.id.value;

    this.MS.obtenerProveedorPorID(proveedorID).subscribe((prov:any)=>{
      this.Form.controls.cedula.setValue(prov.cedula);
      this.Form.controls.nombre.setValue(prov.nombre);
      this.Form.controls.telefono.setValue(prov.telefono);
      this.Form.controls.email.setValue(prov.email);
    });
  }

  eliminarProveedor(){
    const proveedorID = this.Form.controls.id.value;
    //Eliminar un proveedor de la BD mediante el uso de la API.
    this.MS.eliminarProveedor(proveedorID).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }
}
