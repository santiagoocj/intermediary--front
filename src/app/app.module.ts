import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroEmpresaComponent } from './components/empresa/registro-empresa/registro-empresa.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RepresentanteLegalComponent } from './components/empresa/representante-legal/representante-legal.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { UsuarioComponent } from './components/empresa/usuario/usuario.component';
import { MenuAdministradorComponent } from './components/empresa/administrador/menu/menu-administrador/menu-administrador.component';
import { SolicitudRegistroComponent } from './components/empresa/administrador/solicitudes-registro/solicitud-registro/solicitud-registro.component';
import { PanelEmpresaComponent } from './components/empresa/panel-empresa/panel-empresa.component';
import { AdministracionProductosComponent } from './components/empresa/panel-empresa/administracion-productos/administracion-productos.component';
import { CategoriaComponent } from './components/categoria-productos/categoria/categoria.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistroEmpresaComponent,
    RepresentanteLegalComponent,
    LoginComponent,
    UsuarioComponent,
    MenuAdministradorComponent,
    SolicitudRegistroComponent,
    PanelEmpresaComponent,
    AdministracionProductosComponent,
    CategoriaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
