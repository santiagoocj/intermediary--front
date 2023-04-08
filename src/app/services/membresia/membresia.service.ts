import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Membresia } from '../../models/membresia/membesias';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  constructor(private http: HttpClient) { }

  listarMembresias():Observable<Membresia[]>{
    return this.http.get<Membresia[]>(environment.urlEndPoint + '/membresia/lista')
  }

  actualizarMembresia(idEmpresa:number, idMembresia:number, comprobantePago:File){
    let formData = new FormData();
    formData.append("idEmpresa", idEmpresa.toString());
    formData.append("idMembresia", idMembresia.toString());
    formData.append("comprobantePago", comprobantePago);

    const req = new HttpRequest('PUT', environment.urlEndPoint + "/membresia/actualizar", formData);
    return this.http.request(req);
  }

  activarMembresia(idEmpresa:number, idVigencia:number):Observable<any>{
    let formulario = new FormData();
    formulario.append("idEmpresa", idEmpresa.toString());
    formulario.append("idVigencia", idVigencia.toString());

    const req = new HttpRequest('PUT', environment.urlEndPoint + "/membresia/activar", formulario);
    return this.http.request(req).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}
