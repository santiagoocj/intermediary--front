import { Component, OnInit } from '@angular/core';
import { RegistroUsuario } from '../../../models/usuario/registro-usuario';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  
  public usuario: RegistroUsuario = new RegistroUsuario();
  private idSolicitudRegistro: number;

  constructor(private empresaService: EmpresaService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idSolicitudRegistro = params['id_solicitud'];
    })
  }

  realizarRegistro(): void{
    if(this.contraseñaValida()){
      this.empresaService.registrar(this.usuario, this.idSolicitudRegistro).subscribe(response => {
        Swal.fire('¡Registro exitoso!', 'Ya estás registrado en la plataforma, ahora puedes acceder con el nombre de usuario y la contraseña, recuerda que tu usuario es: ' + response.empresa.userName , 'success');
        this.redireccionarAInicio();
      });
    }
  }

  private contraseñaValida(): boolean{
    const contrasena = this.usuario.password;
    const contrasenaRepetida = this.usuario.repeatPassword;
    if(contrasena !== contrasenaRepetida){
      Swal.fire('Contraseña incorrecta', 'Las contraseñas escritas no son iguales', 'error');
      return false;
    }
    return true;
  }

  private redireccionarAInicio(){
    this.router.navigate(['/']);
  }

}
