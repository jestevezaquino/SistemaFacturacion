import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http:HttpClient) { }

  obtenerStats(tabla:string,campo:string,busqueda:string){
    return this.http.get("http://apifacturacion.somee.com/api/consultas/obtener_stats/"+tabla+"/"+campo+"/"+busqueda);
  }
}
