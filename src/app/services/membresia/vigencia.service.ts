import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InformacionCompraMembresia } from '../../models/comun/informacion-compra-membresia';

@Injectable({
  providedIn: 'root'
})
export class VigenciaService {

  constructor(private http: HttpClient) { }

  listarCompraMembresiaConVigenciaInactiva():Observable<InformacionCompraMembresia[]>{
    return this.http.get<InformacionCompraMembresia[]>(environment.urlEndPoint + "/lista-vigencia/inactiva");
  }
}
