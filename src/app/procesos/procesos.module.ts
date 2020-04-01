import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesosComponent } from './procesos.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { StockComponent } from './components/stock/stock.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';


@NgModule({
  declarations: [ProcesosComponent, EntradasComponent, StockComponent, FacturacionComponent],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
    MaterialModule
  ]
})
export class ProcesosModule { }
