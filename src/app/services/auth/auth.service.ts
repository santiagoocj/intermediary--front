import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/usuario/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }
    if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}') as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }
    if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token') || null as any;
      return this._token;
    }
    return null as any;
  }

  login(usuario: Usuario):Observable<any> {
    const urlEndpoint = 'http://localhost:8085/oauth/token';
    const credenciales = btoa('intermediaryapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this.guardarDatosUsuarioSessionStorage();
  }

  private guardarDatosUsuarioSessionStorage(): void{
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    this.guardarDatosTokenEnSessionStorage();
  }

  private guardarDatosTokenEnSessionStorage(): void{
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  logout(): void{
    this._token = null as any;
    this._usuario = null as any;
    this.limpiarSessionStorage();
  }

  private limpiarSessionStorage(): void{
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
}
