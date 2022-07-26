import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroEmpresa } from '../../models/empresa/registro-empresa';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { RegistroUsuario } from '../../models/usuario/registro-usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  preRegistro(registroEmpresa: RegistroEmpresa): Observable<any> {
    return this.http.post<any>(environment.urlEndPoint + '/registro' , registroEmpresa).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  registrar(informacionUsuario: RegistroUsuario, solicitudRegistro: number): Observable<any> {
    return this.http.post<any>(environment.urlEndPoint + '/empresas/registro/' + solicitudRegistro, informacionUsuario).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    )
  }
}
