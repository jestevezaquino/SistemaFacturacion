import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  constructor(private http:HttpClient) { }

  /****************** Metodos Tabla Entrada ******************/

  obtenerEntradas(){
    return this.http.get("http://apifacturacion.somee.com/api/procesos/obtener_entradas");
  }

  obtenerEntradasProductoProveedor(prodID:number, provID:number){
    return this.http.get("http://apifacturacion.somee.com/api/procesos/obtener_entrada_producto_proveedor/"+prodID+"/"+provID);
  }

  agregarEntrada(entrada:any){
    return this.http.post("http://apifacturacion.somee.com/api/procesos/agregar_entrada", entrada);
  }

  eliminarEntrada(id:number){
    return this.http.delete("http://apifacturacion.somee.com/api/procesos/eliminar_entrada/"+id);
  }

  /****************** Metodos Tabla Entrada ******************/
}
