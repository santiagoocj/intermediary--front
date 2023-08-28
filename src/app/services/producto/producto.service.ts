import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto/producto';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ImagenProducto } from 'src/app/models/producto/imagen';
import { Categoria } from '../../models/producto/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { 

  }

  registrarProducto(producto: Producto, idEmpresa: number, categoria: number):Observable<any>{
    return this.http.post<any>(environment.urlEndPoint + '/producto/registro/' + idEmpresa + '/'+ categoria, producto).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  listarTodosProductosActivos(page:number):Observable<any[]>{
    return this.http.get<any[]>(environment.urlEndPoint + '/producto/activo/page/' + page
    );
  }

  listarProductosPorCategoria(categoria: string, page:number):Observable<Producto[]>{
    return this.http.get<Producto[]>(environment.urlEndPoint + '/producto/categoria/' + categoria + '/' + page);
  }

  listarProductos(idEmpresa :number):Observable<any[]>{
    return this.http.get<any[]>(environment.urlEndPoint + '/producto/listar/' + idEmpresa);
  }

  obtenerProducto(idProducto: number):Observable<Producto>{
    return this.http.get<Producto>(environment.urlEndPoint + '/producto/' + idProducto);
  }

  editarProducto(producto: Producto):Observable<any>{
    return this.http.put<any>(environment.urlEndPoint + '/producto', producto).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }

  obtenerImagenes(idProducto: number):Observable<ImagenProducto[]>{
    return this.http.get<ImagenProducto[]>(environment.urlEndPoint + '/producto/imagenes/visualizar/' + idProducto);
  }

  activarProducto(idEmpresa: number, idProducto: number): Observable<any>{
    return this.http.put<any>(environment.urlEndPoint + '/activar/producto/' + idEmpresa + '/' + idProducto, null).pipe(
      catchError(e => {
        Swal.fire('Error al activar', e.error.error, 'warning');
        return throwError(() => e);
      })
    );
  }
}
