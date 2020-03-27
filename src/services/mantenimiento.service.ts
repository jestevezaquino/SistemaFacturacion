import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http:HttpClient) {}

  obtenerProductos(){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_productos");
  }

  obtenerProveedores(){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_proveedores");
  }

  obtenerClientes(){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_clientes");
  }
}
