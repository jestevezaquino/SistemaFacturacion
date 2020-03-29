import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  Form:FormGroup;
  producto:any = [];

  constructor(private fb:FormBuilder, private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      nombre : ['',[Validators.required, Validators.minLength(3)]],
      precio: ['',[Validators.required]]
    })
  }

  limpiarForm(){
    this.Form.reset();
  }

  agregarProducto(){

    const nombre = this.Form.controls.nombre.value;
    const precio = (this.Form.controls.precio.value).toFixed(2);

    this.producto = {
      nombre: nombre,
      precio: precio
    }

    //Agrega un producto a la BD mediante el uso de la API.
    this.MS.agregarProducto(this.producto).subscribe(request=>{
      alert("Se agrego el producto correctamente.");
      this.limpiarForm();
    }, error => {
      console.log(error);
    })
  }
}