import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Negocio } from '../../models/negocio/negocio';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private http: HttpClient) { }

  crearNegociacion(idComprador: number, idProducto: number, negocio: Negocio): Observable<any>{
    return this.http.post<any>(environment.urlEndPoint + '/negociacion/crear/' + idComprador + '/'+ idProducto, negocio).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  listarNegocios(idEmpresa: number):Observable<any[]>{
    return this.http.get<any[]>(environment.urlEndPoint + '/negociacion/' + idEmpresa).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  cancelarSolicitudCompra(idSolicitudCompra: number): Observable<any>{
    return this.http.put<any>(environment.urlEndPoint + '/negociacion/cancelar/' + idSolicitudCompra, undefined).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  negociar(idNegocio: number, contraofertaVendedor: String): Observable<any>{
    return this.http.put<any>(environment.urlEndPoint + '/negociacion/aceptar/' + idNegocio, contraofertaVendedor).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}
