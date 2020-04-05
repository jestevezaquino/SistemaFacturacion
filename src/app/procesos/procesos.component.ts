import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EntradasComponent } from './components/entradas/entradas.component';
import { StockComponent } from './components/stock/stock.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent implements OnInit {

  @ViewChild(EntradasComponent) private entradasComponent: EntradasComponent;
  @ViewChild(StockComponent) private stockComponent: StockComponent;
  @ViewChild(FacturacionComponent) private facturacionComponent: FacturacionComponent;

  constructor() { }

  ngOnInit(): void {

  }

  onTabChanged(event: MatTabChangeEvent)
  {
    if (event.index == 0)
    {
      this.entradasComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 1)
    {
      this.stockComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 2)
    {
      this.facturacionComponent.ngOnInit(); //Or whatever name the method is called
    }
  }
}
