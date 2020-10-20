import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaService } from 'src/app/services/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styles: [
  ]
})
export class CrearCuentaComponent {

  public formSubmitted = false;

  public cuentaForm = this.fb.group ({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    rol: ['entidad', Validators.required],

  },{
    validators: this.passwordsIguales('password','password2' )
  });

  constructor(private fb: FormBuilder, private cuentaService: CuentaService) { }

   crearCuenta(){
     this.formSubmitted = true;
    console.log(this.cuentaForm.value);

    if (this.cuentaForm.invalid) {
      return;
    }
    this.cuentaService.crearCuenta(this.cuentaForm.value).subscribe(resp =>{

      Swal.fire({
        icon: 'success',
        text: 'Cuenta creada'
      });

    },(err)=>{
      Swal.fire('Error', err.error.msg, 'error');
    });
    
  }

  campoNoValido(campo:string): boolean {
    if (this.cuentaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  paswordNovalidas(){
    const pass1 = this.cuentaForm.get('password').value;
    const pass2 = this.cuentaForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true})
      }
    }

  }

}
