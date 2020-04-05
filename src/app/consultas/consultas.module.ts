import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasComponent } from './consultas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { FacturacionesComponent } from './components/facturaciones/facturaciones.component';


@NgModule({
  declarations: [ConsultasComponent, ProductosComponent, ClientesComponent, ProveedoresComponent, EntradasComponent, FacturacionesComponent],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ConsultasModule {}
