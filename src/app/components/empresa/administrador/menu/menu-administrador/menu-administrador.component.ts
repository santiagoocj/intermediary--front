import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.css']
})
export class MenuAdministradorComponent implements OnInit {

  opcionElegida = 'MI_PERFIL';

  constructor() { }

  ngOnInit(): void {
  }

  public asignarOpcionElegida(opcion: string){
    this.opcionElegida = opcion;
    console.log(this.opcionElegida);
  }
}
