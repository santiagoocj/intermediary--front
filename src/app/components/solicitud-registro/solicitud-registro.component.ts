import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
@Component({
  selector: 'app-solicitud-registro',
  templateUrl: './solicitud-registro.component.html',
  styleUrls: ['./solicitud-registro.component.css']
})
export class SolicitudRegistroComponent implements OnInit {
 
  public solicitud:Solicitud= new Solicitud()
  constructor() { }

  ngOnInit(): void {
  }

}
