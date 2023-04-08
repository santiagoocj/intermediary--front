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

  productos: Producto[] = [];

  constructor(private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let categoria: string = '';
    this.activatedRoute.params.subscribe(params => {
      categoria = params['categoria'];
    })
    this.seleccionarTipoBusquedaProductos(categoria);
  }

  seleccionarTipoBusquedaProductos(categoria: string){
    if(categoria == undefined){
      this.listarProductos();
    }else{ 
      this.listarProductosPorCategoria(categoria);
    }
  }

  listarProductos(){
    this.productoService.listarTodosProductosActivos().subscribe(productos => this.productos = productos);
  }

  listarProductosPorCategoria(categoria: string){
    this.productoService.listarProductosPorCategoria(categoria).subscribe(productosEncontrados => this.productos = productosEncontrados);
  }
}
