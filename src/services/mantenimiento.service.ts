import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http:HttpClient) {}

  obtenerProductos(){
    this.http.get("https://localhost:44306/api/mantenimiento/obtener_productos");
  }

  obtenerProveedores(){
    this.http.get("https://localhost:44306/api/mantenimiento/obtener_proveedores");
  }

  obtenerClientes(){
    this.http.get("https://localhost:44306/api/mantenimiento/obtener_clientes");
  }
}
