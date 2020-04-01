import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {

  Form:FormGroup;
  proveedor:any;
  proveedoresDB:any = [];
  noDisponible:boolean;

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
    private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['',[Validators.required]],
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.controlNumericoValidator]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.controlNumericoValidator]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.MS.obtenerProveedores().subscribe((datos:any)=>{
      this.proveedoresDB = datos;
    });

    this.Form.controls.cedula.disable();
    this.Form.controls.nombre.disable();
    this.Form.controls.telefono.disable();
    this.Form.controls.email.disable();

    this.noDisponible = false;
  }

  //Custom validator para controlar que la cedula y telefono tengan solo numeros
  controlNumericoValidator(control: AbstractControl) : {[key:string]:boolean} | null {

    let test = Number(control.value);

    if (isNaN(test)) {
      return { 'notNumber': true };
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
      data: '¿Estás seguro de querer editar este proveedor?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.MS.obtenerProveedorPorCedula(this.Form.controls.cedula.value).subscribe((data:any)=>{
          if(data.cedula == 'NOT FOUND'){
            this.editarProveedor();
          } else{
            if(data.proveedorID == this.Form.controls.id.value)
            {
              this.editarProveedor();
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
    const proveedorID = this.Form.controls.id.value;

    this.MS.obtenerProveedorPorID(proveedorID).subscribe((prov:any)=>{
      this.Form.controls.cedula.setValue(prov.cedula);
      this.Form.controls.cedula.enable();
      this.Form.controls.nombre.setValue(prov.nombre);
      this.Form.controls.nombre.enable();
      this.Form.controls.telefono.setValue(prov.telefono);
      this.Form.controls.telefono.enable();
      this.Form.controls.email.setValue(prov.email);
      this.Form.controls.email.enable();
    });
  }

  editarProveedor(){
    const proveedorID = this.Form.controls.id.value;
    const cedula = this.Form.controls.cedula.value;
    const nombre = this.Form.controls.nombre.value;
    const telefono = this.Form.controls.telefono.value;
    const email = this.Form.controls.email.value;

    this.proveedor = {
      proveedorID: proveedorID,
      cedula: cedula,
      nombre: nombre,
      telefono: telefono,
      email: email
    }

    //Editar un proveedor de la BD mediante el uso de la API.
    this.MS.editarProveedor(this.proveedor).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
    }, error => {
      console.log(error);
    });
  }
}
