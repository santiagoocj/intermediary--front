import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isAuthenticated()){
        if(this.isTokenExpirado()){
          this.auth.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
    return false;
  }
  
  isTokenExpirado(): boolean{
    let token = this.auth.token;
    let payload = this.auth.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
}
