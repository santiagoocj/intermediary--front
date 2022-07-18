import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudRegistroService {

  private urlEndPoint:string = "http://localhost:8085/api";

  constructor(private http: HttpClient) { }

  registrarSolicitud(empresa: number, representanteLegal: number): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/solicitud-registro/${empresa}/${representanteLegal}`, null);
  }
}
