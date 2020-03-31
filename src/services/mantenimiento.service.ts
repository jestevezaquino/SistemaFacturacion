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
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_proveedores");
  }

  obtenerProveedorPorID(id:number){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_proveedor/"+id);
  }

  obtenerProveedorPorNombre(nombre:string){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_proveedor_nombre/"+nombre);
  }

  obtenerProveedorPorEmail(email:string){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_proveedor_email/"+email);
  }

  agregarProveedor(proveedor:any){
    return this.http.post("http://apifacturacion.somee.com/api/mantenimiento/agregar_proveedor", proveedor);
  }

  editarProveedor(proveedor:any){
    return this.http.put("http://apifacturacion.somee.com/api/mantenimiento/editar_proveedor", proveedor);
  }

  eliminarProveedor(id:number){
    return this.http.delete("http://apifacturacion.somee.com/api/mantenimiento/eliminar_proveedor/"+id);
  }

  /****************** CRUD PROVEEDORES ******************/

  /****************** CRUD CLIENTES ******************/

  obtenerClientes(){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_clientes");
  }

  obtenerClientePorID(id:number){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_cliente/"+id);
  }

  obtenerClientePorNombre(nombre:string){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_cliente_nombre/"+nombre);
  }

  obtenerClientesPorCategoria(categoria:string){
    return this.http.get("http://apifacturacion.somee.com/api/mantenimiento/obtener_cliente_categoria/"+categoria);
  }

  agregarCliente(cliente:any){
    return this.http.post("http://apifacturacion.somee.com/api/mantenimiento/agregar_cliente", cliente);
  }

  editarCliente(cliente:any){
    return this.http.put("http://apifacturacion.somee.com/api/mantenimiento/editar_cliente", cliente);
  }

  eliminarCliente(id:number){
    return this.http.delete("http://apifacturacion.somee.com/api/mantenimiento/eliminar_cliente/"+id);
  }

  /****************** CRUD CLIENTES ******************/
}
