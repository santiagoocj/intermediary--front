import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../../models/producto/categoria';
import { CategoriaService } from '../../../services/producto/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria;
  @Output() enviarCategoria = new EventEmitter<Categoria>();

  constructor(private categoriaService: CategoriaService) {
  }

  ejecutarEnvioCategoria(){
    this.enviarCategoria.emit(this.categoriaSeleccionada);
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.categoriaService.obtenerCategorias().subscribe(categoriasEncontradas => this.categorias = categoriasEncontradas)
  }

}
