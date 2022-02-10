import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContenidoService } from 'src/app/services/contenido.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  listaContenido: any[]=[];
  form: FormGroup;
  accion = 'Agregar';
  id:number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _contenidoService: ContenidoService) { 
    this.form = fb.group({
      codigo_producto: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(5)]],
      clase_producto: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(5)]],
      nombre: ['', [Validators.required,Validators.maxLength(50),Validators.minLength(1)]],
      autor: ['', [Validators.required,Validators.maxLength(50),Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerContenido();
  }

  obtenerContenido(){
    this._contenidoService.getListContenido().subscribe(data =>
      {
        console.log(data);
        this.listaContenido = data;
      }
    ,error =>{console.log(error);})
  }

  agregarContenido(){

    const contenido: any={
      codigo_producto: this.form.get('codigo_producto')?.value,
      clase_producto: this.form.get('clase_producto')?.value,
      nombre: this.form.get('nombre')?.value,
      autor: this.form.get('autor')?.value
    };

    if (this.id == undefined) {
      //Agrega el contenido
      this._contenidoService.saveContenido(contenido).subscribe(data=>{
        this.toastr.success('se registro con exito', 'La ' + contenido.clase_producto + ' ' +contenido.nombre);
        this.form.reset();
        this.obtenerContenido();
      }, error =>{
        this.toastr.error('Upsss... ocurrio un error','Error')
        console.log(error)
      })
    }else{
      //Edita el contenido
      contenido.id =this.id;
      this._contenidoService.updateContenido(this.id, contenido).subscribe(data =>{
        this.accion = 'Agregar';
        this.form.reset();
        this.id= undefined;
        this.obtenerContenido();
        this.toastr.info('se actulizo con exito', 'La ' + contenido.clase_producto + ' ' +contenido.nombre)
      })
    }
    
    
    
  }

  eliminarContenido(contenido: any){
    this._contenidoService.deleteContenido(contenido.id).subscribe(data =>{
      this.toastr.success('se elimino con exito', 'La ' + contenido.clase_producto + ' ' +contenido.nombre);
      this.obtenerContenido();
    }, error =>{
      console.log(error);
    })
  }

  editarContenido(contenido:any){
    this.accion= "Editar";
    this.id= contenido.id;

    this.form.patchValue({
      codigo_producto: contenido.codigo_producto,
      clase_producto: contenido.clase_producto,
      nombre: contenido.nombre,
      autor: contenido.autor
    })
  }

}
