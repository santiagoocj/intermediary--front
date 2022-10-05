import { Component, OnInit } from '@angular/core';
import { SolicitudesRegistro } from '../../../../../models/empresa/solicitudes-registro';
import { SolicitudRegistroService } from '../../../../../services/solicitud-registro/solicitud-registro.service';
import { SolicitudRegistro } from '../../../../../models/empresa/solicitud-registro';
import { EstadoSolicitudEnum } from '../../../../../models/enum/estado-solicitud-enum';
import { EstadoSolicitud } from '../../../../../models/empresa/estado-solicitud';
import Swal from 'sweetalert2';
import { ConversorService } from '../../../../../services/util/conversor.service';

@Component({
  selector: 'app-solicitud-registro',
  templateUrl: './solicitud-registro.component.html',
  styleUrls: ['./solicitud-registro.component.css']
})
export class SolicitudRegistroComponent implements OnInit {

  solicitudesDeRegistro: SolicitudesRegistro = new SolicitudesRegistro();
  modalInformacionCompleta: boolean = false;
  modalEstadoSolicitud: boolean = false;
  infoCompletaEmpresa: SolicitudRegistro;
  validarEstadoSolicitud: SolicitudRegistro;
  contenidoEnvioSolicitudAprovacion: EstadoSolicitud;
  urlEndPoint = 'http://localhost:4200/registro/usuario/';

  constructor(private solicitudRegistroService: SolicitudRegistroService, private conversorService: ConversorService) { }

  ngOnInit(): void {
    this.obtenerSolicitudesRegistro();
  }

  private obtenerSolicitudesRegistro(): void{
    this.solicitudRegistroService.listarSolicitudes().subscribe(response => {
      this.solicitudesDeRegistro = response;
      console.log(this.solicitudesDeRegistro);
    })
  }

  abrirModalInformacionCompletaEmpresa(info: SolicitudRegistro): void{
    this.modalInformacionCompleta = true;
    this.infoCompletaEmpresa = new SolicitudRegistro();
    this.infoCompletaEmpresa = info;
  }

  cerrarModalInformacionCompletaEmpresa(): void{
    this.modalInformacionCompleta = false;
  } 

  abrirModalEstadoSolicitud(estado: EstadoSolicitudEnum, solicitud: SolicitudRegistro){
    this.contenidoEnvioSolicitudAprovacion = new EstadoSolicitud();
    this.modalEstadoSolicitud = true;
    this.contenidoEnvioSolicitudAprovacion.estado = estado as EstadoSolicitudEnum;
    this.asignarURLsiEstadoSolicitudEsAprovado(estado, solicitud);
    this.validarEstadoSolicitud = solicitud;
  }

  cerrarModalEstadoSolicitud(){
    this.modalEstadoSolicitud = false;
  }

  public confirmarEstadoSolicitud(){
    this.solicitudRegistroService.cambiarEstadoSolicitudRegistro(this.contenidoEnvioSolicitudAprovacion, this.validarEstadoSolicitud.id).subscribe(response => {
      Swal.fire('Solicitud Modificada', 'la solicitud de registro se ha modificado exitosamente', 'success');
      this.cerrarModalEstadoSolicitud();
      this.obtenerSolicitudesRegistro();
    });
  }

  private asignarURLsiEstadoSolicitudEsAprovado(estado: EstadoSolicitudEnum, solicitud: SolicitudRegistro){
    if(estado === EstadoSolicitudEnum.APROBADA){
      this.contenidoEnvioSolicitudAprovacion.contenidoCorreoEstadoSolicitud = 'Link para finalizar registro ' + this.urlEndPoint + solicitud.id;
    }
  }

}
