import { Component, OnInit } from '@angular/core';
import { RegistroEmpresa } from '../../../models/empresa/registro-empresa';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConversorService } from 'src/app/services/util/conversor.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {

  public empresa:RegistroEmpresa = new RegistroEmpresa();
  public registroEmpresa:string = 'Registro de la empresa';
  previsualizacion: string;

  constructor(private empresaService: EmpresaService, 
    private router: Router, 
    private conversorService: ConversorService) { }

  ngOnInit(): void {
  }

  public realizarRegistro(): any{
    this.empresaService.preRegistro(this.empresa).subscribe(
      response => {
        this.router.navigate([`/registro/representante/${response.registro.id}`])
        Swal.fire('Registro Exitoso!', response.mensaje, 'success')
      }
    );
  }

  capturarArchivoAnexo(event: any): any{
    const anexo = event.target.files[0];
    this.conversorService.extraerBase64(anexo).then((archivo: any)=> {
      this.empresa.anexo = archivo.base;
      this.previsualizacion = archivo.base;
      Swal.fire('Archivo exitos', 'El anexo se subio de forma correcta', 'success');
    })
  }

}
