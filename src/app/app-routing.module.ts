import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizarRegistroEmpresaComponent } from './components/empresa/finalizar-registro-empresa/finalizar-registro-empresa.component';
import { RegistroEmpresaComponent } from './components/empresa/registro-empresa/registro-empresa.component';
import { RepresentanteLegalComponent } from './components/empresa/representante-legal/representante-legal.component';

const routes: Routes = [
  {path: 'registro/empresa', component: RegistroEmpresaComponent},
  {path: 'registro/representante/:id_registro', component: RepresentanteLegalComponent},
  {path: 'registro/:id_registro/:id_representante', component: FinalizarRegistroEmpresaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
