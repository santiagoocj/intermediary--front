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
import { FinalizarRegistroEmpresaComponent } from './components/empresa/finalizar-registro-empresa/finalizar-registro-empresa.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegistroEmpresaComponent,
    RepresentanteLegalComponent,
    FinalizarRegistroEmpresaComponent,
    LoginComponent
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
