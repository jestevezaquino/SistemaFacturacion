import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'SistemaFacturacion';

  constructor(private router:Router){}

  abrirMantenimiento(){
    this.router.navigate(['/mantenimiento']);
  }

  abrirProcesos(){
    this.router.navigate(['/procesos']);
  }

  abrirConsultas(){
    this.router.navigate(['/consultas']);
  }
}
