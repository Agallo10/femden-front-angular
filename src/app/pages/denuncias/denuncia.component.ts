import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/comentario.model';
import { Denuncia } from 'src/app/models/denuncia.model';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DenunciasService } from 'src/app/services/denuncias.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.component.html',
  styles: [
  ]
})
export class DenunciaComponent implements OnInit {

  public denuncia: Denuncia;
  public estado: 'hola';
  public formSubmitted = false;
  public comentarioForm: FormGroup;
  public radicadoForm: FormGroup;
  public comentarios: Comentario[] = [];
  public cargando: boolean = true;
  public id: string;



  constructor(private denunciaService: DenunciasService,
    private activatedRoute: ActivatedRoute,
    private comentarioService: ComentariosService,
    private fb: FormBuilder,
    private cuentaService: CuentaService) {
    //this.denuncia = denunciaService.denuncia;
  }

  ngOnInit(): void {

     this.activatedRoute.params
       .subscribe(({ id }) => this.cargarDenuncia(id));
     this.activatedRoute.params
       .subscribe(({ id }) => this.cargarComentarios(id));


    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);

    this.activatedRoute.params.subscribe(({id})=>
    this.comentarioForm = this.fb.group({
      comentario: [''],
      fecha: [today],
      cuenta: [this.cuentaService.uid],
      denuncia: [id],
    }));

    
  }

  cargarDenuncia(id: string) {
    this.denunciaService.getDenunciaUid(id)
      .subscribe(denuncia => {
        this.denuncia = denuncia;

        this.radicadoForm = this.fb.group({
          numeroRadicado:[this.denuncia.numeroRadicado],
        });
      })
  }

  cambiarEstadoFiscal() {
    this.denunciaService.actualizarEstado(this.denuncia.uid, this.estado)
      .subscribe(resp => {
        this.cargarDenuncia(this.denuncia.uid);
        Swal.fire({
          icon: 'success',
          text: 'Se actualizo a estado fiscal'
        });
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err);
      });

    console.log('funciona');
  }

  finalzarDenuncia() {
    this.denunciaService.actualizarEstado2(this.denuncia.uid, this.estado)
      .subscribe(resp => {
        this.cargarDenuncia(this.denuncia.uid);
        Swal.fire({
          icon: 'success',
          text: 'Se actualizo a estado finalizado'
        });
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err);
      });

    console.log('funciona');
  }

  cargarComentarios(id:string) {
    this.cargando = true
    this.comentarioService.getComentarios2(id)
      .subscribe(({ comentarios }) => {

        this.comentarios = comentarios;
      });
  }

  crearComentario() {

    this.formSubmitted = true;

    if (this.comentarioForm.invalid) {
      return;
    }
    this.comentarioService.crearComentario(this.comentarioForm.value).subscribe(resp => {
      this.cargarComentarios(this.denuncia.uid);
      Swal.fire({
        icon: 'success',
        text: 'Comentario realizado'
      });

    }, (err) => {
      Swal.fire('Error', err.error.errores.comentario.msg, 'error');
      console.log(err.error);
    });

  }


  eliminarComentario(comentario: Comentario) {

    Swal.fire({
      title: 'Borrar comentario?',
      text: `Esta a punto de borrar este comentario ${comentario.comentario} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'

    }).then((result) => {
      if (result.isConfirmed) {
        this.comentarioService.eliminarComentario(comentario)
          .subscribe(resp => {
            this.cargarComentarios(this.denuncia.uid);
            Swal.fire(
              'Borrado!',
              'El comentario ha sido borrado',
              'success'
            );
          });
      }
    })

  }

  agregarNumeroRadicado(){
    this.denunciaService.agregarNumeroRadicado(this.denuncia.uid, this.radicadoForm.value)
      .subscribe(resp => {
        this.cargarDenuncia(this.denuncia.uid);
        Swal.fire({
          icon: 'success',
          text: 'Se agregó el número de radicado'
        });
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
        console.log(err);
      });

    console.log('funciona');
  }

  


}
