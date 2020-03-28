import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [MantenimientoComponent],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MaterialModule
  ]
})
export class MantenimientoModule { }
