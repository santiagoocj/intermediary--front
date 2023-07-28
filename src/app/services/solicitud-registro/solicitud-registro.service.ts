import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SolicitudesRegistro } from '../../models/empresa/solicitudes-registro';
import { EstadoSolicitud } from '../../models/empresa/estado-solicitud';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SolicitudRegistroService {

  constructor(private http: HttpClient) { }

  registrarSolicitud(empresa: number, representanteLegal: number): Observable<any>{
    return this.http.post<any>(`${environment.urlEndPoint}/solicitud-registro/${empresa}/${representanteLegal}`, null).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e); 
      })
    );
  }

  listarSolicitudes(): Observable<SolicitudesRegistro>{
    return this.http.get<SolicitudesRegistro>(environment.urlEndPoint + '/solicitud-registro'); 
  }

  cambiarEstadoSolicitudRegistro(estadoSolicitud: EstadoSolicitud, solicitudRegistro: number): Observable<any>{
    return this.http.post<any>(`${environment.urlEndPoint}/solicitud-registro/${solicitudRegistro}`, estadoSolicitud);
  }
}
