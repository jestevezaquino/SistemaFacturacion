import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesosComponent } from './procesos.component';
import { EntradasComponent } from './components/entradas/entradas.component';
import { StockComponent } from './components/stock/stock.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';


@NgModule({
  declarations: [ProcesosComponent, EntradasComponent, StockComponent, ConsultasComponent, FacturacionComponent],
  imports: [
    CommonModule,
    ProcesosRoutingModule
  ]
})
export class ProcesosModule { }
