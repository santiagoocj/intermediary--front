import { Categoria } from './categoria';
import { ImagenProducto } from './imagen';
export class Producto{
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