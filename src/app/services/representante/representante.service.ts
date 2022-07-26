import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepresentanteLegal } from '../../models/empresa/representante-legal';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  private urlEndPoint:string = "http://localhost:8085/api";

  constructor(private http: HttpClient) { }

  registroRepresentante(representanteLegal: RepresentanteLegal): Observable<any>{
    return this.http.post<any>(this.urlEndPoint + '/representantelegal' , representanteLegal).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e); 
      })
    );
  }
}
