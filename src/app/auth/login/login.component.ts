import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/services/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  //public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', Validators.required,],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private cuentaService: CuentaService) { }

  login() {
    this.cuentaService.login(this.loginForm.value)
      .subscribe(resp =>{
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        }else{
          localStorage.removeItem('email');
        }
        //navegar al dashboard
        this.router.navigateByUrl('/');

      },(err)=>{
        Swal.fire('Error', err.error.msg, 'error')
        console.log(err.error.msg)
      });
    //console.log(this.loginForm.value);
  }

}
