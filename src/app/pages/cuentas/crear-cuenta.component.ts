import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rol.model';
import { TipoEntidad } from 'src/app/models/tipoEntidad.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { RolService } from 'src/app/services/rol.service';
import { TipoEntidadService } from 'src/app/services/tipo-entidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styles: [
  ]
})
export class CrearCuentaComponent implements OnInit{

  public formSubmitted = false;
  public roles: Rol[]= [];
  public tiposE: TipoEntidad[]= [];
  public rolSeleccionado: Rol;
  public tipoSeleccionado: TipoEntidad;
  public cuentaForm: FormGroup;
  public disable: boolean = true;

  constructor(private fb: FormBuilder,
              private cuentaService: CuentaService,
              private rolService: RolService,
              private tipoEntidadService: TipoEntidadService) { }

  
  ngOnInit(): void {

    this.cuentaForm = this.fb.group({
      nombre: ['', Validators.required],
      nombreEncargado: ['', Validators.required],
      documento: ['', Validators.required],
      cargo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      rol: ['', Validators.required],
      tipoEntidad: [''],
  
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });

    
    this.cargarRoles();

    this.crearCuenta();

    this.cargarTipos();

    this.desabilitar();
  }

  desabilitar(){
    if (localStorage.getItem('tipoEntidad') != '5f97389f40cb934fbccd96d5') {
      this.disable=false;
    }
  }

  crearCuenta() {
    
    this.formSubmitted = true;

    if (this.cuentaForm.invalid) {
      return;
    }
    this.cuentaService.crearCuenta(this.cuentaForm.value, localStorage.getItem('tipoEntidad')).subscribe(resp => {

      Swal.fire({
        icon: 'success',
        text: 'Cuenta creada'
      });

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
      console.log(err);
    });

  }

  campoNoValido(campo: string): boolean {
    if (this.cuentaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  paswordNovalidas() {
    const pass1 = this.cuentaForm.get('password').value;
    const pass2 = this.cuentaForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }

  }

  cargarRoles() {
    this.rolService.getRoles()
        .subscribe(({roles})=>{
          this.roles= roles
        })
  }
  
  cargarTipos() {
    this.tipoEntidadService.getTipos()
        .subscribe(({tipoEntidades})=>{
          this.tiposE= tipoEntidades
        })
  }
}
