import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MantenimientoService } from 'src/services/mantenimiento.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  Form:FormGroup;
  producto:any = [];
  productosDB:any = [];

  constructor(private fb:FormBuilder, private MS:MantenimientoService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      id : ['',[Validators.required]],
      nombre : ['',[Validators.required, Validators.minLength(3)]],
      precio: ['',[Validators.required]]
    })

    this.MS.obtenerProductos().subscribe((datos:any)=>{
      this.productosDB = datos;
    })
  }

  limpiarForm(){
    this.Form.reset();
  }

  editarProducto(){
    const productoID = this.Form.controls.id.value;
    const nombre = this.Form.controls.nombre.value;
    const precio = (this.Form.controls.precio.value).toFixed(2);

    this.producto = {
      productoID: productoID,
      nombre: nombre,
      precio: precio
    }

    //Agrega un producto a la BD mediante el uso de la API.
    this.MS.editarProducto(this.producto).subscribe(request=>{
      alert("Se editó el producto correctamente.");
      this.limpiarForm();
    }, error => {
      console.log(error);
    })
  }
}
