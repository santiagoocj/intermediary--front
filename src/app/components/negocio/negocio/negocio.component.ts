import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto/producto';
import { ProductoService } from '../../../services/producto/producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { NegocioService } from '../../../services/negociacion/negocio.service';
import { Negocio } from 'src/app/models/negocio/negocio';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent implements OnInit {

  producto: Producto = new Producto;
  idProducto: number;
  negocio: Negocio = new Negocio;

  constructor(private productoService: ProductoService, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
    private negocioService: NegocioService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idProducto = params['id_producto'];
    });
    this.obtenerProducto();
  }

  obtenerProducto(){
    this.productoService.obtenerProducto(this.idProducto).subscribe(producto => {
      this.producto = producto;
    })
  }

  realizarOfertaComprador(){
    Swal.fire({
      title: '¿Está seguro que desea continuar?',
      text: "Si confirma se procedera a la negociación con el vendedor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2B0939',
      cancelButtonColor: '#E5E5E5',
      confirmButtonText: 'Continuar negociación',
      cancelButtonText: 'cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crearNegociacion();
      }
    })
  }

  private crearNegociacion(){
    const idComprador = this.authService.usuario.id;
    this.negocioService.crearNegociacion(idComprador, this.idProducto, this.negocio).subscribe((negocio) => {
      Swal.fire('Proceso exitoso', negocio.mensaje, 'success');
    });
  }

}
