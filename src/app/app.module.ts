import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MantenimientoService } from 'src/services/mantenimiento.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [MantenimientoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
