import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-empresa',
  templateUrl: './panel-empresa.component.html',
  styleUrls: ['./panel-empresa.component.css']
})
export class PanelEmpresaComponent implements OnInit {

  opcionElegida = 'MI_PERFIL'; 

  constructor() { }

  ngOnInit(): void {
  }

  public asignarOpcionElegida(opcion: string){
    this.opcionElegida = opcion;
  }

}
