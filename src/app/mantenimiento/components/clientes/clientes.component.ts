import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { VerClientesComponent } from './ver-clientes/ver-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './eliminar-cliente/eliminar-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @ViewChild(VerClientesComponent) private verClientesComponent: VerClientesComponent;
  @ViewChild(AgregarClienteComponent) private agregarClienteComponent: AgregarClienteComponent;
  @ViewChild(EditarClienteComponent) private editarClienteComponent: EditarClienteComponent;
  @ViewChild(EliminarClienteComponent) private eliminarClienteComponent: EliminarClienteComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged(event: MatTabChangeEvent)
  {
    if (event.index == 0)
    {
      this.verClientesComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 1)
    {
      this.agregarClienteComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 2)
    {
      this.editarClienteComponent.ngOnInit(); //Or whatever name the method is called
    }
    else if(event.index == 3)
    {
      this.eliminarClienteComponent.ngOnInit(); //Or whatever name the method is called
    }
  }
}
