import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { Categoria } from '../../../../models/producto/categoria';
import { ProductoService } from '../../../../services/producto/producto.service';
import Swal from 'sweetalert2';
import { ImagenProducto } from 'src/app/models/producto/imagen';
import { AuthService } from '../../../../services/auth/auth.service';
import { ImagenService } from '../../../../services/imagenes/imagen.service';

@Component({
  selector: 'app-administracion-productos',
  templateUrl: './administracion-productos.component.html',
  styleUrls: ['./administracion-productos.component.css']
})
export class AdministracionProductosComponent implements OnInit {

  producto: Producto;
  estadoModalRegistroProducto = false;
  estadoModalEditarProducto = false;
  estadoModalRegistroImagenes = false;
  listaProductos: any[] = [];
  fotosSeleccionadas: File[] = [];
  listaImagenes: ImagenProducto[] = [];
  posicionImagen: number = 0;

  constructor(private productoService: ProductoService, private authService: AuthService, private imagenService: ImagenService) { }

  ngOnInit(): void {
    this.listarTodosProductos();
  }

  modalRegistroProducto(){
    this.producto = new Producto(); 
    this.estadoModalRegistroProducto = !this.estadoModalRegistroProducto;
  }

  cerrarModalRegistroProducto(){
    this.estadoModalRegistroProducto = !this.estadoModalRegistroProducto;
  }

  obtenerCategoria(categoria: Categoria){
    this.producto.categoriaDTO = categoria;
  }

  registrarProducto(){
    const idCategoria = this.producto.categoriaDTO.id;
    this.producto.imagenes = [];
    this.productoService.registrarProducto(this.producto, idCategoria).subscribe(response =>{
      Swal.fire('Registro exitoso', response.mensaje, 'success');
      this.modalRegistroProducto();
      this.listarTodosProductos();
    });
  }

  listarTodosProductos(){
    this.productoService.listarProductos().subscribe(productos =>{
      console.log(productos)
      this.listaProductos = productos
    })
  }

  private obtenerProducto(idProducto: number){
    this.productoService.obtenerProducto(idProducto).subscribe(productoObtenido => {
      this.producto = productoObtenido;
    })
  }

  editarProducto(){
    this.productoService.editarProducto(this.producto).subscribe(productoEditado => {
      Swal.fire('Registro editado exitoso', productoEditado.mensaje, 'success');
      this.cerrarModalEdicionProducto();
      this.listarTodosProductos();
    })
  }

  cerrarModalEdicionProducto(){
    this.estadoModalEditarProducto = !this.estadoModalEditarProducto;
  }

  modalEditarProducto(idProducto: number){
    this.estadoModalEditarProducto = ! this.estadoModalEditarProducto;
    this.obtenerProducto(idProducto);
  }

  validarObjetoVacio(): boolean{
    return Object.entries(this.producto).length === 0;
  }

  obtenerImagenesDelProducto(idProducto:number){
    this.productoService.obtenerImagenes(idProducto).subscribe(imagenes => this.listaImagenes = imagenes);
  }

  modalRegistroImagenes(idProducto: number){
    this.obtenerProducto(idProducto);
    this.obtenerImagenesDelProducto(idProducto);
    this.estadoModalRegistroImagenes = ! this.estadoModalRegistroImagenes;
  }

  modalCerrarRegistroImagenes(){
    this.estadoModalRegistroImagenes = ! this.estadoModalRegistroImagenes;
  }

  seleccionarFoto(event: any) {
    this.fotosSeleccionadas = event.target.files;
  }

  subirFoto() {
    if (!this.fotosSeleccionadas || this.fotosSeleccionadas.length == 0) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.imagenService.subirImagen(this.fotosSeleccionadas, this.producto.id, this.authService.usuario.username, this.producto.nombre).subscribe(() =>{
        Swal.fire('Registro exitoso', 'El registro a sido exitoso', 'success');
        this.fotosSeleccionadas = []; 
        this.obtenerImagenesDelProducto(this.producto.id);
      });
    }
  }

  eliminarImagen(posicionImagen:number){
    console.log("DENTRA A LA FUNCION")
    if(this.producto != undefined){
      this.imagenService.eliminarImagen(this.producto.id, posicionImagen)
      .subscribe(respuesta => {
        Swal.fire('Eliminación exitosa', respuesta.mensaje, 'success')
        this.obtenerImagenesDelProducto(this.producto.id);
      })
    }
  }
}
