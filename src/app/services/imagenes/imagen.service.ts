import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }

  subirImagen(fotosSeleccionadas: File[], idProducto: number, empresa: string, producto: string):Observable<any>{
    let formData = new FormData();
    for(var i = 0; i< fotosSeleccionadas.length; i++){
      formData.append("imagen", fotosSeleccionadas[i]);
    }
    formData.append("id", idProducto.toString());
    formData.append("empresa", empresa.replace(/\s+/g, ''));
    formData.append("producto", producto.replace(/\s+/g, ''));

    const req = new HttpRequest('POST', environment.urlEndPoint + "/imagen/upload", formData);
    return this.http.request(req);
  }

  eliminarImagen(idProducto: number, posicionImagenLista: number):Observable<any>{
    return this.http.delete<any>(environment.urlEndPoint + "/imagen/" + idProducto + "/" + posicionImagenLista);
  }
}
