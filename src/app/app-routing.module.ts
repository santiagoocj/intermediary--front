import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroEmpresaComponent } from './components/empresa/registro-empresa/registro-empresa.component';
import { RepresentanteLegalComponent } from './components/empresa/representante-legal/representante-legal.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/empresa/usuario/usuario.component';
import { MenuAdministradorComponent } from './components/empresa/administrador/menu/menu-administrador/menu-administrador.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { RoleGuard } from './guard/role/role.guard';
import { PanelEmpresaComponent } from './components/empresa/panel-empresa/panel-empresa.component';
import { RoleEnum } from './models/enum/role-enum';
import { InicioComponent } from './components/inicio/inicio.component';
import { NegocioComponent } from './components/negocio/negocio/negocio.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'producto/activo/page/:page',component: InicioComponent},
  {path: 'inicio/:categoria', component: InicioComponent},
  {path: 'registro/empresa', component: RegistroEmpresaComponent},
  {path: 'registro/representante/:id_registro', component: RepresentanteLegalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro/usuario/:id_solicitud', component: UsuarioComponent},
  {path: 'home/administrador', component: MenuAdministradorComponent, canActivate: [AuthGuard, RoleGuard], data: {role: RoleEnum.ROLE_ADMINISTRADOR}},
  {path: 'home/empresa', component: PanelEmpresaComponent, canActivate: [AuthGuard, RoleGuard], data: {roles: [RoleEnum.ROLE_EMPRESA_INICIAL, RoleEnum.ROLE_EMPRESA]}},
  {path: 'negocio/:id_producto', component: NegocioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: RoleEnum.ROLE_EMPRESA}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
