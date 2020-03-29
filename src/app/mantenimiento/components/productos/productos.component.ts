import { Component, ViewChild, OnInit } from '@angular/core';
import { VerProductosComponent } from './ver-productos/ver-productos.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  @ViewChild(VerProductosComponent) private verProductosComponent: VerProductosComponent;
  @ViewChild(AgregarProductoComponent) private agregarProductoComponent: AgregarProductoComponent;
  @ViewChild(EditarProductoComponent) private editarProductoComponent: EditarProductoComponent; 
  @ViewChild(EliminarProductoComponent) private eliminarProductoComponent: EliminarProductoComponent; 

  constructor() { }

  ngOnInit(): void {
  }
  
  onTabChanged(event: MatTabChangeEvent) 
  {
    if (event.index == 0)
    {
        this.verProductosComponent.ngOnInit();//Or whatever name the method is called
    }
    else if(event.index == 1)
    {
        this.agregarProductoComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 2)
    {
        this.editarProductoComponent.ngOnInit(); //Or whatever name the method is called
    }
    else
    {
        this.eliminarProductoComponent.ngOnInit(); //Or whatever name the method is called
    } 
  }
}
