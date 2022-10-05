import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto/producto';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ImagenProducto } from 'src/app/models/producto/imagen';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { 

  }

  registrarProducto(producto: Producto, categoria: number):Observable<any>{
    return this.http.post<any>(environment.urlEndPoint + '/producto/registro/' + categoria, producto).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  listarProductos():Observable<any[]>{
    return this.http.get<any[]>(environment.urlEndPoint + '/producto');
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
}
