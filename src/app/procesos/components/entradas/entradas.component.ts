import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

  Form:FormGroup;
  arrayProductos:any = [];
  arrayProveedores:any = [];
  arrayEntradas:any = [];
  noValido:boolean;

  constructor(private formBuilder:FormBuilder, private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.pattern('[0-9]*'), this.controlCantidadValidator]],
      proveedor: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });

    this.MS.obtenerProductos().subscribe((data)=>{
      this.arrayProductos = data;
    });

    this.MS.obtenerProveedores().subscribe((data)=>{
      this.arrayProveedores = data;
    });

    this.noValido = false;
  }

  //Custom validator para controlar el precio
  controlCantidadValidator(control: AbstractControl) : {[key:string]:boolean} | null {

    if (control.value <= 0 || control.value.toString().includes('.') == true){
      return { 'priceRange': true };
    }
    return null;
  }

  limpiar(){
    this.Form.reset();
    this.noValido = false;
  }

  agregarEntrada(){
    const productoID = this.Form.controls.producto.value;
    const cantidad = this.Form.controls.cantidad.value;
    const proveedorID = this.Form.controls.proveedor.value;
    const fecha = this.Form.controls.fecha.value;
  }
}
