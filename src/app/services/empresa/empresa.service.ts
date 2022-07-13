import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroEmpresa } from '../../models/empresa/registro-empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { RepresentanteLegal } from '../../models/empresa/representante-legal';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlEndPoint:string = "http://localhost:8085/api";

  constructor(private http: HttpClient) { }

  preRegistro(registroEmpresa: RegistroEmpresa): Observable<any> {
    return this.http.post<any>(this.urlEndPoint + '/registro' , registroEmpresa).pipe(
      catchError(e => {
        console.log(e)
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  registroRepresentante(representanteLegal: RepresentanteLegal): Observable<any>{
    return this.http.post<any>(this.urlEndPoint + '/representantelegal' , representanteLegal).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}
