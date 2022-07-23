import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Solicitud } from '../models/solicitud';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  
  private url='http://localhost:8085/api/registro';
  private urlsol='';
 
  constructor(private http: HttpClient) { }

  public getList(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.url);
  }

 /*  public sendResponse():Observable<Solicitud[]>{
    return this.http.p<Solicitud[]>(this.urlsol);
  } */
}
