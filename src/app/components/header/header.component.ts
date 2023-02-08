import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/models/enum/role-enum';
import { Categoria } from '../../models/producto/categoria';
import { CategoriaService } from '../../services/producto/categoria.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public categorias: Categoria[] = [];

  constructor(public auth: AuthService, private route: Router, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
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

  obtenerCategorias(){
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
    })
  }
}
