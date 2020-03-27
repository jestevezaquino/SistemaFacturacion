import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from 'src/services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {

  datos:any = [];

  constructor(private MS:MantenimientoService) { }

  ngOnInit(){
    this.MS.obtenerClientes().subscribe((info:any)=>{
      this.datos = info;
      console.log(this.datos);
    }); 
  }
}
