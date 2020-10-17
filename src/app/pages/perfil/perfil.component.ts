import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilFrom: FormGroup;
  public cuenta: Cuenta;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private cuentaService: CuentaService,
              private fileUploadService:FileUploadService ) {

    this.cuenta= cuentaService.cuenta;

   }

  ngOnInit(): void {

    this.perfilFrom = this.fb.group({
      nombre:[this.cuenta.nombre, Validators.required],
    });
  }

  actualizarPerfil(){
    this.cuentaService.actualizarPerfil( this.perfilFrom.value)
    .subscribe( resp =>{
      const {nombre} = this.perfilFrom.value;
      this.cuenta.nombre= nombre;
      Swal.fire({
        icon: 'success',
        text: 'Actualizado'
      });
    },(err)=>{
      Swal.fire('Error', err.error.msg, 'error');
    });
    }

    cambiarImagen( file: File ){
      this.imagenSubir = file;

      if (!file) { return this.imgTemp = null }

      const reader = new FileReader();
      reader.readAsDataURL( file );

      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }

    subirImagen(){
      this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'cuentas', this.cuenta.uid)
      .then( img =>{
        this.cuenta.imagen = img
        Swal.fire({
          icon: 'success',
          text: 'imagen actualizada'
        });
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          text: 'No se pudo subir la imagen'
        });
      })
    }
      
}
