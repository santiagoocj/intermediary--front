import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo: string = 'Iniciar Sesión';
  usuario: Usuario;

  constructor(private auth: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      Swal.fire('Login', 'Ya estás autenticado', 'info');
      this.router.navigate(['/']);
    }
  }

  login(): void{
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login', 'Nombre de usuario o contraseña vacías!', 'error');
      return;
    }

    this.auth.login(this.usuario).subscribe({
      next: (response) => {
        console.log(response);
        this.auth.guardarUsuario(response.access_token);
        this.auth.guardarToken(response.access_token);

        this.router.navigate(['/']);
        Swal.fire('Login', 'Bienvenido ' + this.usuario.username, 'success');
      },
      error: (err) => {
        if(err){
          Swal.fire('Error Login', 'Nombre de usuario o contraseña incorrectas!', 'error');
        }
      }
    });
  }

}
