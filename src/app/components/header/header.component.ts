import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/models/enum/role-enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    console.log(this.auth.usuario) 
  }

  logout(): void{
    this.auth.logout();
    this.route.navigate(['/']);
    Swal.fire('Cierre de sesión', '¡Has cerrado sesión de manera exitosa!', 'success');
  } 

  obtenerPanelDeAcuerdoRol(): void{
    if(this.auth.hasRole(RoleEnum.ROLE_ADMINISTRADOR)){
      this.route.navigate(['/home/administrador'])
    }
    else if(this.auth.hasRole(RoleEnum.ROLE_EMPRESA_INICIAL) || this.auth.hasRole(RoleEnum.ROLE_EMPRESA)){
      this.route.navigate(['/home/empresa'])
    }
  }
}
