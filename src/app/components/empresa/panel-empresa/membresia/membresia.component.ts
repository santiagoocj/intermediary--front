import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { RoleEnum } from '../../../../models/enum/role-enum';
import { MembresiaService } from '../../../../services/membresia/membresia.service';
import { Membresia } from '../../../../models/membresia/membesias';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  public informacionMembresiaGeneral:string = "Actualmente posees una membresía general la cual te permipe personalisar los productos, si deseas publicar tus productos adquiere une membresía diferente";
  membresias: Membresia[] = [];

  constructor(private authService: AuthService, private membresiaService: MembresiaService) { }

  ngOnInit(): void {
    this.obtenerMembresias();
  }

  membresiaInicial(): boolean{
    return this.authService.usuario.roles[0] == RoleEnum.ROLE_EMPRESA_INICIAL.toString();
  }

  obtenerMembresias(){
    this.membresiaService.listarMembresias().subscribe(res => {
      this.membresias = res;
    })
  }

}
