import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membresia } from '../../models/membresia/membesias';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  constructor(private http: HttpClient) { }

  listarMembresias():Observable<Membresia[]>{
    return this.http.get<Membresia[]>(environment.urlEndPoint + '/membresia/lista')
  }
}
