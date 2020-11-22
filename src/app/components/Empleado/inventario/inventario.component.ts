import { Component, OnInit } from '@angular/core';
//servicios
import {ProveedorService} from '../../../services/proveedor.service';
import {InventarioService} from '../../../services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  producto = {
    codigo: "",
    nombreProd: "",
    existencia: 0,
    precio: 0,
    categoria: "Alimentos",
    subCategoria: "",
    marca: "",
    descripcion: "",
    img: "",
    nombreProveedor: "",
    horario: "",
    telefono: ""
    
  }

  productoM = {
    codigo: "",
    nombreProd: "",
    existencia: 0,
    precio: 0,
    categoria: "",
    subCategoria: "",
    marca: "",
    descripcion: "",
    img: "",
    proveedor: Array
    
  }

  proveedorI = {
    codigo : "",
    nombreProveedor: "",
    horario: "",
    telefono: ""
  }

  proveedorEliminado = {
    codigo : "",
    id: ""
  }

  productoB = {
    nombre : "",
    categoria: "Todos"
  }

  productos;

  productosFiltrados;

  exito = 0;

  proveedores;

  valores = "";
  
  arrayInfoProv;

  p: number = 1;

  cambioImg = false;

  spinerStatus = 0;

  masInfo = false;

  constructor(private provService : ProveedorService, private prodService: InventarioService) { }

  ngOnInit(): void {
    this.consultarTodo();
  }

  consultarTodo(){
    this.productos = this.prodService.consultarTodo();
  }

  buscarLike(){
    this.prodService.buscarLikeInv(this.productoB).subscribe(res => {
      this.productosFiltrados = res;
    },
    err => console.log(err));
  }

  buscar(){
    if (this.productoB.categoria == 'Todos') 
      this.buscarLike();
      //console.log(this.productoB.categoria);
    else
      this.buscarLikeCat();
      //console.log(this.productoB.categoria);
  }

  buscarLikeCat(){
    this.prodService.buscarLikeCatInv(this.productoB).subscribe(res => {
      this.productosFiltrados = res;
    },
    err => console.log(err));
  }

  regProd(){
    this.spinerStatus = 3;

    if (this.producto.img == '') 
     this.producto.img = "../assets/productosImg/default.png";
    else
      this.producto.img = "../assets/productosImg/" + this.producto.img.substring(12, this.producto.img.length);

    this.prodService.regProd(this.producto).subscribe(res =>{
      this.exito = 1;
      this.consultarTodo();
      this.limpiarProd();
      this.spinerStatus = 1;
    }, 
    err => {
      this.exito = 2;
      this.spinerStatus = 2;
    })
  }

  consultarProveedores(){
    this.proveedores = this.provService.consultarTodo();
  }

  obtenerValorProv(){
    //llena el objeto proveedores que esta dentro de productos
    if(this.valores != 'Ninguno'){
      this.arrayInfoProv = this.valores.split('|');
      this.producto.nombreProveedor = this.arrayInfoProv[0];
      this.producto.telefono = this.arrayInfoProv[1];
      this.producto.horario = this.arrayInfoProv[2];
    }else{
      this.producto.nombreProveedor = 'Ninguno';
      this.producto.telefono = 'Ninguno';
      this.producto.horario = 'Ninguno';  
    }
   
  }

  buscarCodigo(codigo){
    this.productoM.codigo = codigo;
    this.prodService.buscarCodigo(this.productoM).subscribe(res => {
      this.productoM = res;
    },
    err => console.log(err));
  }

  agregarProv(codigo){
    this.spinerStatus = 3;
    this.proveedorI.codigo = codigo;
    let array = this.valores.split('|');
    this.proveedorI.nombreProveedor = array[0];
    this.proveedorI.telefono = array[1];
    this.proveedorI.horario = array[2];

    this.prodService.agregarProv(this.proveedorI).subscribe(res => {
      this.exito = 1;
      this.buscarCodigo(codigo);
      this.spinerStatus = 1;
    },
    err => {
      this.exito = 2;
      this.spinerStatus = 2;
    })
  }

  eliminarProv(){
    this.spinerStatus = 3;
    this.prodService.eliminarProvProd(this.proveedorEliminado).subscribe(res =>{
      this.exito = 1;
      this.buscarCodigo(this.proveedorEliminado.codigo);
      this.spinerStatus = 1;
    },
    err => {
      this.exito = 2;
      this.spinerStatus = 2;
    })
  }

  llenarInfoProvEliminar(codigoProv, codigo){
    this.proveedorEliminado.codigo = codigo;
    this.proveedorEliminado.id = codigoProv;
  }

  modificarProducto(){
    this.spinerStatus = 3;

    if(this.cambioImg){
      if (this.productoM.img == '') 
       this.productoM.img = "../assets/productosImg/default.png";
      else
        this.productoM.img = "../assets/productosImg/" + this.productoM.img.substring(12, this.productoM.img. length);
    }

    this.prodService.modificarProd(this.productoM).subscribe(res => {
      this.exito = 1;
      this.consultarTodo();
      this.cambioImg = false;
      this.spinerStatus = 1;
    },
     err => {
       this.exito = 2;
       this.spinerStatus = 2;
     })
  }

  eliminarProd(){
    this.prodService.eliminarProd(this.productoM).subscribe(res => {
      this.consultarTodo();
    },
    err => console.log(err)); 
  }

//funciones extra
  reiniciarExito(){
    this.exito = 0;
    this.spinerStatus = 0;
  }

  limpiarProd(){
    this.producto.categoria = '';
    this.producto.codigo = '';
    this.producto.descripcion = '';
    this.producto.existencia = 0;
    this.producto.img = '';
    this.producto.marca = '';
    this.producto.nombreProd = '';
    this.producto.precio = 0;
    this.producto.subCategoria = '';
    this.valores = '';
  }

  cambiarImg(){
    if (this.cambioImg) 
      this.cambioImg = false;
    else
      this.cambioImg = true;
 }

 cambiarInfo(valor){
    this.masInfo = valor;
}

}
