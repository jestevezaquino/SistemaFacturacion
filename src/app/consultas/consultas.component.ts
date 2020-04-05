import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { FacturacionesComponent } from './components/facturaciones/facturaciones.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  @ViewChild(ProductosComponent) private productosComponent: ProductosComponent;
  @ViewChild(ClientesComponent) private clientesComponent: ClientesComponent;
  @ViewChild(ProveedoresComponent) private proveedoresComponent: ProveedoresComponent;
  @ViewChild(EntradasComponent) private entradasComponent: EntradasComponent;
  @ViewChild(FacturacionesComponent) private facturacionesComponent: FacturacionesComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged(event: MatTabChangeEvent)
  {
    if (event.index == 0)
    {
      this.productosComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 1)
    {
      this.clientesComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 2)
    {
      this.proveedoresComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 3)
    {
      this.entradasComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 4)
    {
      this.facturacionesComponent.ngOnInit(); //Or whatever name the method is called
    }
  }
}
