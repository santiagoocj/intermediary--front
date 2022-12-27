import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { Categoria } from '../../../../models/producto/categoria';
import { ProductoService } from '../../../../services/producto/producto.service';
import Swal from 'sweetalert2';
import { ImagenProducto } from 'src/app/models/producto/imagen';
import { AuthService } from '../../../../services/auth/auth.service';
import { ImagenService } from '../../../../services/imagenes/imagen.service';
import { RoleEnum } from '../../../../models/enum/role-enum';

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
    const idEmpresa = this.authService.usuario.id;
    this.producto.imagenes = [];
    this.productoService.registrarProducto(this.producto, idEmpresa, idCategoria).subscribe(response =>{
      Swal.fire('Registro exitoso', response.mensaje, 'success');
      this.modalRegistroProducto();
      this.listarTodosProductos();
    });
  }

  listarTodosProductos(){
    const idEmpresa = this.authService.usuario.id;
    this.productoService.listarProductos(idEmpresa).subscribe(productos =>{
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
    this.validarFormatoSubir();
  }

  private validarFormatoSubir(){
    for(let i = 0; i < this.fotosSeleccionadas.length; i++){
      if(this.fotosSeleccionadas[i].type.indexOf('image') < 0){
        Swal.fire('Error seleccion imagenes', 'El archivo: ' + this.fotosSeleccionadas[i].name + ' debe ser del tipo imagen', 'error');
        this.fotosSeleccionadas = [];
      }
    }
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
    if(this.producto != undefined){
      this.imagenService.eliminarImagen(this.producto.id, posicionImagen)
      .subscribe(respuesta => {
        Swal.fire('Eliminación exitosa', respuesta.mensaje, 'success')
        this.obtenerImagenesDelProducto(this.producto.id);
      })
    }
  }

  async activarProducto(idProducto: number){
    if(this.authService.usuario.roles[0] == RoleEnum.ROLE_EMPRESA_INICIAL.toString()){
      Swal.fire('Error publicar producto', 'La empresa no tiene los permisos para realizar la acción, por favor adquiera una membresia para poder publicar tus productos', 'info');
      return;
    }
    await this.obtenerImagenesDelProducto(idProducto);
    if(this.listaImagenes.length == 0){
      Swal.fire('Error activar el producto', 'Para poder activar el producto debe registrar como minimo una imagen', 'warning');
      return
    }
    this.productoService.activarProducto(this.authService.usuario.id, idProducto).subscribe(producto => {
      Swal.fire('Activación Exitosa', producto.mensaje, 'success');
    })
  }
}
