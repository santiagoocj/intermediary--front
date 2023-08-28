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

  public tipoPersonas: String[] = ["Natural", "Jurídico"];
  public aceptarTerminos: boolean = false;
  public empresa:RegistroEmpresa = new RegistroEmpresa();
  public registroEmpresa:string = 'Registro de la empresa';
  public terminosYCondiciones:string = "Esta página web ofrece a los visitantes realizar comercio electrónico a través de ella. Al acceder o usar la página web de nuestro servicio, usted aprueba que haya leído, entendido y aceptado estar sujeto a estos Términos";
  previsualizacion: string;
  documentoAnexo:File;

  constructor(private empresaService: EmpresaService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  public realizarRegistro(): any{
    this.empresaService.preRegistro(this.empresa).subscribe(
      response => {
        this.empresaService.registrarDocumento(this.documentoAnexo,response.registro.id).subscribe(() => {
          this.router.navigate([`/registro/representante/${response.registro.id}`]);
          Swal.fire('Registro Exitoso!', response.mensaje, 'success');
        });
      }
    );
  }

  capturarArchivoAnexo(event: any): any{
    this.documentoAnexo = event.target.files[0];
    Swal.fire('Archivo exitos', 'El anexo se subio de forma correcta', 'success');
  }

}
