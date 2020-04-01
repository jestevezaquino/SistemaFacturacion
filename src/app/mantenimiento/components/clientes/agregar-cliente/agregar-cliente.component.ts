import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from '../../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  Form:FormGroup;
  cliente:any;
  selectOptions:any = [{tipo: 'Regular'}, {tipo: 'Premium'}];
  noDisponible:boolean;

  constructor(private fb:FormBuilder, public dialog:MatDialog, private snackbar:MatSnackBar,
              private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.controlNumericoValidator]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.controlNumericoValidator]],
      email: ['', [Validators.required, Validators.email]],
      categoria: ['', [Validators.required]]
    });
    this.noDisponible = false;
  }

  //Custom validator para controlar que la cédula y teléfono tengan solo numeros
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
      data: '¿Estás seguro de querer agregar este cliente?'
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.MS.obtenerClientePorCedula(this.Form.controls.cedula.value).subscribe((data:any)=>{
          if(data.cedula == 'NOT FOUND'){
            this.agregarCliente();
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
      data: 'Se agrego el cliente correctamente.'
    });
  }

  agregarCliente(){
    const cedula = this.Form.controls.cedula.value;
    const nombre = this.Form.controls.nombre.value;
    const telefono = this.Form.controls.telefono.value;
    const email = this.Form.controls.email.value;
    const categoria = this.Form.controls.categoria.value;

    this.cliente = {
      cedula: cedula,
      nombre: nombre,
      telefono: telefono,
      email: email,
      categoria: categoria
    }

    //Agrega un cliente a la BD mediante el uso de la API.
    this.MS.agregarCliente(this.cliente).subscribe(request=>{
      this.openSnackBar();
      this.limpiarForm();
    }, error => {
      console.log(error);
    });
  }
}
