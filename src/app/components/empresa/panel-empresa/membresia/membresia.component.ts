import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { RoleEnum } from '../../../../models/enum/role-enum';
import { MembresiaService } from '../../../../services/membresia/membresia.service';
import { Membresia } from '../../../../models/membresia/membesias';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  public informacionMembresiaGeneral:string = "Actualmente posees una membresía general la cual te permipe personalisar los productos, si deseas publicar tus productos adquiere une membresía diferente";
  membresias: Membresia[] = [];
  modalRegistrarMembresia = false;
  private idMembresia:number;
  private comprobantePago:File;
  comprobantePagoValido = false;

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

  activarModalRegistroMembresia(idMembresia:number){
    this.modalRegistrarMembresia = true;
    this.idMembresia = idMembresia;
  }

  cerrarModalRegistroMembresia(){
    this.modalRegistrarMembresia = false;
  }

  seleccionarComprobante(event:any){
    this.comprobantePago = event.target.files[0];;
    if(this.comprobantePago.type.indexOf('image') < 0){
      Swal.fire('Error seleccion imagen', 'El archivo: ' + this.comprobantePago.name + ' debe ser del tipo imagen', 'error');
    }else{
      this.comprobantePagoValido = true;
    }
    
  }

  activarMembresia(){
    const idEmpresa = this.authService.usuario.id;
    this.membresiaService.actualizarMembresia(idEmpresa, this.idMembresia, this.comprobantePago).subscribe(res => {
      Swal.fire('Activación en proceso', 'se actualizó la membresia de manera exitosa, se verificará el comprobante de pago y posteriormente se hará la activación.', 'success');
      this.cerrarModalRegistroMembresia();
    })
  }
}
