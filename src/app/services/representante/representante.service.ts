import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepresentanteLegal } from '../../models/empresa/representante-legal';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  constructor(private http: HttpClient) { }

  registroRepresentante(representanteLegal: RepresentanteLegal): Observable<any>{
    return this.http.post<any>(environment.urlEndPoint + '/representantelegal' , representanteLegal).pipe(
      catchError(e => {
        Swal.fire('Error al crear', e.error.error, 'error');
        return throwError(() => e); 
      })
    );
  }
}
