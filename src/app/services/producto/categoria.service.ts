import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../../models/producto/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(environment.urlEndPoint + '/categorias');
  }
}
