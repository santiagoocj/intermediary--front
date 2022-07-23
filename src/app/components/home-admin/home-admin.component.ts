import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/models/solicitud';
import { SolicitudService } from 'src/app/services/solicitud.service';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  Solicitudes: Solicitud[] = [];
  constructor(

    private  SolicitudService: SolicitudService
  ) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  }
  cargarSolicitudes(): void {
    this.SolicitudService.getList().subscribe(
      data => {
        console.log(data);
        this.Solicitudes = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
