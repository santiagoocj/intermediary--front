import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentanteLegal } from '../../../models/empresa/representante-legal';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-representante-legal',
  templateUrl: './representante-legal.component.html',
  styleUrls: ['./representante-legal.component.css']
})
export class RepresentanteLegalComponent implements OnInit {

  public registroRepresentante: string = 'Registro Representante';
  public representanteLegal: RepresentanteLegal = new RepresentanteLegal();

  private idRegistro: number;

  constructor(private empresaService: EmpresaService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idRegistro = params['id_registro'];
    })
  }

  public crearRepresentante(): any{
    this.empresaService.registroRepresentante(this.representanteLegal).subscribe(
      response => {
        console.log(response)
        this.router.navigate([`/registro/${this.idRegistro}/${response.cliente.id}`]);
        Swal.fire('Registro Representante', response.mensaje, 'success');
      }
    )
  }

}
