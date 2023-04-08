import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NegocioService } from '../../../services/negociacion/negocio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-negociaciones',
  templateUrl: './negociaciones.component.html',
  styleUrls: ['./negociaciones.component.css']
})
export class NegociacionesComponent implements OnInit {

  negocios: any[] = [];
  idEmpresa: number;
  modalNegociaciones: boolean = false;
  negocio: any;

  constructor(private authService: AuthService,
    private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.idEmpresa = this.authService.usuario.id;
    this.listarNegocios();
  }

  private listarNegocios(){
    this.negocioService.listarNegocios(this.idEmpresa).subscribe(negocios => {
      this.negocios = negocios;
      console.log(this.negocios)
    })
  }

  activarModalNegociaciones(Negocio: any){
    this.modalNegociaciones = true;
    this.negocio = Negocio;
  }

  cerrarModalnegociaciones(){
    this.modalNegociaciones = false;
    this.negocio = undefined;
  }

  cancelarOferta(){
    this.negocioService.cancelarSolicitudCompra(this.negocio.solicitudCompra.id).subscribe(res => {
      Swal.fire('Solicitud cancelada', res.mensaje, 'success');
    });
  }

  negociar(){
    this.negocioService.negociar(this.negocio.id, this.negocio.contraOfertaVendedor).subscribe(res => {
      Swal.fire('Solicitud aceptada', res.mensaje, 'success');
    });
  }

}
