import { Component, OnInit } from '@angular/core';
import { RegistroEmpresa } from '../../../models/empresa/registro-empresa';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

  public empresa:RegistroEmpresa = new RegistroEmpresa();
  public registroEmpresa:string = 'Registro de la empresa';

  constructor(private empresaService: EmpresaService, private router: Router) { }

  ngOnInit(): void {
  }

  public realizarRegistro(): any{
    this.empresaService.preRegistro(this.empresa).subscribe(
      response => {
        console.log(response)
        this.router.navigate(['/registro/empresa'])
        Swal.fire('Registro Exitoso!', response.mensaje, 'success')
      }
    );
  }

}
