import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentanteLegal } from '../../../models/empresa/representante-legal';
import Swal from 'sweetalert2';
import { RepresentanteService } from '../../../services/representante/representante.service';
import { SolicitudRegistroService } from 'src/app/services/solicitud-registro/solicitud-registro.service';

@Component({
  selector: 'app-representante-legal',
  templateUrl: './representante-legal.component.html',
  styleUrls: ['./representante-legal.component.css']
})
export class RepresentanteLegalComponent implements OnInit {

  public registroRepresentante: string = 'Registro Representante';
  public representanteLegal: RepresentanteLegal = new RepresentanteLegal();
  public tipoIdentificacion: String[] = ["CC", "NIT","Pasaporte"];
  private idRegistro: number;

  constructor(private representateService: RepresentanteService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private solicitudRegistro: SolicitudRegistroService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idRegistro = params['id_registro'];
    })
  }

  public crearRepresentante(): any{
    this.representateService.registroRepresentante(this.representanteLegal).subscribe(
      response => {
        this.crearSolicitudRegistro(this.idRegistro, response.cliente.id);
      }
    )
  }

  private crearSolicitudRegistro(registro: number, representanteLegal: number) {
    this.solicitudRegistro.registrarSolicitud(registro, representanteLegal).subscribe(
      response => {
        Swal.fire('¡Registro Exitoso!', response.mensaje, 'success');
        this.redireccionarAInicio();
      }
    )
  }

  private redireccionarAInicio(){
    this.router.navigate(['/']);
  }

}
