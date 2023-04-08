import { Component, OnInit } from '@angular/core';
import { InformacionCompraMembresia } from '../../../../../models/comun/informacion-compra-membresia';
import { VigenciaService } from '../../../../../services/membresia/vigencia.service';
import { MembresiaService } from '../../../../../services/membresia/membresia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresias-validar',
  templateUrl: './membresias-validar.component.html',
  styleUrls: ['./membresias-validar.component.css']
})
export class MembresiasValidarComponent implements OnInit {

  informacionCompraMembresia: InformacionCompraMembresia[] = [];
  estadoModalVisualizarComprobantePago = false;
  comprobantePago: string;

  constructor(private vigenciaServcie: VigenciaService, private membresiaService: MembresiaService) { }

  ngOnInit(): void {
    this.obtenerListaMembresiasConVigenciaInactiva();
  }

  obtenerListaMembresiasConVigenciaInactiva(){
    this.vigenciaServcie.listarCompraMembresiaConVigenciaInactiva().subscribe(vigencias => {
      this.informacionCompraMembresia = vigencias;
    })
  }

  modalCerrarComprobantePago(){
    this.estadoModalVisualizarComprobantePago = false;
    this.comprobantePago = "";
  }

  abrirModalVisualizarComprobantePago(comprobantePago: string){
    this.estadoModalVisualizarComprobantePago = true;
    this.comprobantePago = comprobantePago;
  }

  activarMembresia(idEmpresa: number, idVigencia: number){
    this.membresiaService.activarMembresia(idEmpresa, idVigencia).subscribe(res => {
      Swal.fire("Membresia activada",res.mensaje,"success");
      this.obtenerListaMembresiasConVigenciaInactiva();
    })
  }
}
