import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private fb:FormBuilder, private snackbar:MatSnackBar,
              private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      cedula : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      categoria: ['', [Validators.required]]
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
      data: 'Se agrego el cliente correctamente.'
    });
  }

  agregarCliente(){

    this.MS.obtenerClientePorCedula(this.Form.controls.cedula.value).subscribe((data:any)=>{
      if(data.cedula == 'NOT FOUND'){
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
      } else{
        this.noDisponible = true;
      }
    });
  }
}
