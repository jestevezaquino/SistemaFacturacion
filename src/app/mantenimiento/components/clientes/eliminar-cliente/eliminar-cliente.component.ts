import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from '../../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  Form:FormGroup;
  cliente:any;
  clientesDB:any = [];
  selectOptions:any = [{tipo: 'Regular'}, {tipo: 'Premium'}];

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
              private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['', [Validators.required]],
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      categoria: ['', [Validators.required]]
    });

    this.MS.obtenerClientes().subscribe((datos:any)=>{
      this.clientesDB = datos;
    });

    this.Form.controls.cedula.disable();
    this.Form.controls.nombre.disable();
    this.Form.controls.telefono.disable();
    this.Form.controls.email.disable();
    this.Form.controls.categoria.disable();
  }

  limpiarForm(){
    this.Form.reset();
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de querer eliminar este cliente?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.eliminarCliente();
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se ha eliminado el cliente correctamente.'
    });
  }

  actualizarDatos(){
    const clienteID = this.Form.controls.id.value;

    this.MS.obtenerClientePorID(clienteID).subscribe((clt:any)=>{
      this.Form.controls.cedula.setValue(clt.cedula);
      this.Form.controls.nombre.setValue(clt.nombre);
      this.Form.controls.telefono.setValue(clt.telefono);
      this.Form.controls.email.setValue(clt.email);
      this.Form.controls.categoria.setValue(clt.categoria);
    });
  }

  eliminarCliente(){
    const clienteID = this.Form.controls.id.value;
    //Eliminar un proveedor de la BD mediante el uso de la API.
    this.MS.eliminarCliente(clienteID).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
      this.ngOnInit();
    }, error => {
      console.log(error);
    });
  }
}
