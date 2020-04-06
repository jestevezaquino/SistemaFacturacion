import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  Form:FormGroup;
  proveedor:any;
  noDisponible:boolean;

  constructor(private fb:FormBuilder, private snackbar:MatSnackBar,
              private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.noDisponible = false;
  }

  limpiarForm(){
    this.Form.reset();
    this.noDisponible = false;
  }

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se agrego el proveedor correctamente.'
    });
  }

  agregarProveedor(){
    this.MS.obtenerProveedorPorCedula(this.Form.controls.cedula.value).subscribe((data:any)=>{
      if(data.cedula == 'NOT FOUND'){
        const cedula = this.Form.controls.cedula.value;
        const nombre = this.Form.controls.nombre.value;
        const telefono = this.Form.controls.telefono.value;
        const email = this.Form.controls.email.value;

        this.proveedor = {
          cedula: cedula,
          nombre: nombre,
          telefono: telefono,
          email: email
        }

        //Agrega un proveedor a la BD mediante el uso de la API.
        this.MS.agregarProveedor(this.proveedor).subscribe(request=>{
          this.openSnackBar();
          this.limpiarForm();
        }, error => {
          console.log(error);
        });
      } else{
        this.noDisponible = true;
      }
    });
  }
}
