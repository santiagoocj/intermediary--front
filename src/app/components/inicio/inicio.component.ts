import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  paginador: any;
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let categoria: string = '';
    this.activatedRoute.params.subscribe(params => {
      categoria = params['categoria'];
      let page: number = +params['page'];
      if (!page){
        page = 0;
      }
    this.seleccionarTipoBusquedaProductos(categoria, page);
    })
  }

  seleccionarTipoBusquedaProductos(categoria: string, page: number){
    if(categoria == undefined){
      this.listarProductos(page);
    }else{ 
      this.listarProductosPorCategoria(categoria, page);
    }
  }

  listarProductos(page:number){
    this.productoService.listarTodosProductosActivos(page).subscribe(productos => {
      let response: any = productos;
      this.productos = response.content as Producto[];
      this.paginador = productos;
    });
  }

  listarProductosPorCategoria(categoria: string, page:number){
    this.productoService.listarProductosPorCategoria(categoria, page).subscribe(productosEncontrados => {
      let response: any = productosEncontrados;
      this.productos = response.content as Producto[];
      this.paginador = productosEncontrados;
    });
  }
}
