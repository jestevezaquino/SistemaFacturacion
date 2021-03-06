import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  Form:FormGroup;
  producto:any;
  noDisponible:boolean;

  constructor(private fb:FormBuilder, private snackbar:MatSnackBar,
              private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      nombre : ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, this.controlCantidadValidator]]
    });
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

  openSnackBar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000,
      data: 'Se agrego el producto correctamente.'
    });
  }

  agregarProducto(){
    this.MS.obtenerProductoPorNombre(this.Form.controls.nombre.value).subscribe((data:any)=>{
      if(data.productoID == -1){
        const nombre = this.Form.controls.nombre.value;
        const precio = (this.Form.controls.precio.value).toFixed(2);

        this.producto = {
          nombre: nombre,
          precio: precio
        }

        //Agrega un producto a la BD mediante el uso de la API.
        this.MS.agregarProducto(this.producto).subscribe(request=>{
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
