import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.auth.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }
      let role = route.data['role'] as string;
      if(this.auth.hasRole(role)){
        return true;
      }
      Swal.fire('Acceso denegado', 'No tienes acceso a este recurso', 'warning');
      this.router.navigate(['/']);
    return false;
  }
  
}