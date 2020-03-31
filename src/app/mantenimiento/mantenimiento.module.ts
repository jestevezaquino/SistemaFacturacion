import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoComponent } from './mantenimiento.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './components/productos/productos.component';
import { VerProductosComponent } from './components/productos/ver-productos/ver-productos.component';
import { AgregarProductoComponent } from './components/productos/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './components/productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './components/productos/eliminar-producto/eliminar-producto.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

@NgModule({
  declarations: [MantenimientoComponent, ProductosComponent, VerProductosComponent, AgregarProductoComponent, EditarProductoComponent, EliminarProductoComponent],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmDialogComponent, SnackBarComponent]
})
export class MantenimientoModule { }
