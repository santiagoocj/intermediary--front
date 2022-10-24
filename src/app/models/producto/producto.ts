import { Categoria } from './categoria';
import { ImagenProducto } from './imagen';
import { AbstractEntidadComun } from '../comun/abstract-entidad-comun';
export class Producto extends AbstractEntidadComun{
    id: number;
    nombre: string;
    descripcion: string;
    dimensiones: string;
    peso: number;
    precio: number;
    imagenes: ImagenProducto[];
    precioUnidad: number;
    categoriaDTO: Categoria;
}