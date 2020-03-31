import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http:HttpClient) {}

  /****************** CRUD PRODUCTOS ******************/

  obtenerProductos(){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_productos");
  }

  obtenerProductoPorID(id:number){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_producto/"+id);
  }

  obtenerProductoPorNombre(nombre:string){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_producto_nombre/"+nombre);
  }

  agregarProducto(producto:any){
    return this.http.post("http://apifacturacion.somee.com/api/mantenimiento/agregar_producto", producto)
  }

  editarProducto(producto:any){
    return this.http.put("http://apifacturacion.somee.com/api/mantenimiento/editar_producto", producto);
  }

  eliminarProducto(id:number){
    return this.http.delete("http://apifacturacion.somee.com/api/mantenimiento/eliminar_producto/"+id);
  }

  /****************** CRUD PRODUCTOS ******************/

  /****************** CRUD PROVEEDORES ******************/

  obtenerProveedores(){
    return this.http.get("http://apifacturacion.somee.com/mantenimiento/obtener_proveedores");
  }

  /****************** CRUD PROVEEDORES ******************/

  /****************** CRUD CLIENTES ******************/

  obtenerClientes(){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_clientes");
  }

  /****************** CRUD CLIENTES ******************/
}
