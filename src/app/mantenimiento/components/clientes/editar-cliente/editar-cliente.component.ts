import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from '../../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  Form:FormGroup;
  cliente:any;
  clientesDB:any = [];
  categoriaOptions:any = [{tipo: 'Regular'}, {tipo: 'Premium'}];
  noDisponible:boolean;

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
              private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['', [Validators.required]],
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
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

    this.noDisponible = false;
  }

  limpiarForm(){
    this.Form.reset();
    this.noDisponible = false;
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: '¿Estás seguro de querer editar este cliente?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.MS.obtenerClientePorCedula(this.Form.controls.cedula.value).subscribe((data:any)=>{
          if(data.cedula == 'NOT FOUND'){
            this.editarCliente();
          } else{
            this.noDisponible = true;
          }
        });
      }
    });
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se edito el cliente correctamente.'
    });
  }

  actualizarDatos(){
    const clienteID = this.Form.controls.id.value;

    this.MS.obtenerClientePorID(clienteID).subscribe((clt:any)=>{
      this.Form.controls.cedula.setValue(clt.cedula);
      this.Form.controls.cedula.enable();
      this.Form.controls.nombre.setValue(clt.nombre);
      this.Form.controls.nombre.enable();
      this.Form.controls.telefono.setValue(clt.telefono);
      this.Form.controls.telefono.enable();
      this.Form.controls.email.setValue(clt.email);
      this.Form.controls.email.enable();
      this.Form.controls.categoria.setValue(clt.categoria);
      this.Form.controls.categoria.enable();
    });
  }

  editarCliente(){
    const clienteID = this.Form.controls.id.value;
    const cedula = this.Form.controls.cedula.value;
    const nombre = this.Form.controls.nombre.value;
    const telefono = this.Form.controls.telefono.value;
    const email = this.Form.controls.email.value;
    const categoria = this.Form.controls.categoria.value;

    this.cliente = {
      clienteID: clienteID,
      cedula: cedula,
      nombre: nombre,
      telefono: telefono,
      email: email,
      categoria: categoria
    }

    //Editar un cliente de la BD mediante el uso de la API.
    this.MS.editarCliente(this.cliente).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
    }, error => {
      console.log(error);
    });
  }
}
