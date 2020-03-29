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

  obtenerProductoPorID(id:number){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_producto/"+id);
  }

  obtenerProductoPorNombre(nombre:string){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_producto_nombre/"+nombre);
  }

  agregarProducto(producto:any){
    return this.http.post("https://localhost:44306/api/mantenimiento/agregar_producto", producto)
  }

  editarProducto(id:number, producto:any){
    return this.http.put("https://localhost:44306/api/mantenimiento/editar_producto/"+id, producto);
  }

  obtenerProveedores(){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_proveedores");
  }

  obtenerClientes(){
    return this.http.get("https://localhost:44306/api/mantenimiento/obtener_clientes");
  }
}
