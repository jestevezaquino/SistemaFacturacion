import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from './editar-proveedor/editar-proveedor.component';
import { EliminarProveedorComponent } from './eliminar-proveedor/eliminar-proveedor.component';
import { VerProveedoresComponent } from './ver-proveedores/ver-proveedores.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  @ViewChild(VerProveedoresComponent) private verProveedoresComponent: VerProveedoresComponent;
  @ViewChild(AgregarProveedorComponent) private agregarProveedorComponent: AgregarProveedorComponent;
  @ViewChild(EditarProveedorComponent) private editarProveedorComponent: EditarProveedorComponent;
  @ViewChild(EliminarProveedorComponent) private eliminarProveedorComponent: EliminarProveedorComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged(event: MatTabChangeEvent) 
  {
    if (event.index == 0)
    {
        this.verProveedoresComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 1)
    {
        this.agregarProveedorComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 2)
    {
        this.editarProveedorComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 3)
    {
        this.eliminarProveedorComponent.ngOnInit(); //Or whatever name the method is called
    } 
  }
}
