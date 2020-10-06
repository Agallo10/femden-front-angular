
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form-interface';
import { catchError, map, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { Router } from '@angular/router';

const base_url= environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class CuentaService {

    constructor( private http: HttpClient,
                    private ruter: Router){}

    logout(){
        localStorage.removeItem('token');
        this.ruter.navigateByUrl('/login');
    }

    validarToken(){

        const token = localStorage.getItem('token') || "";

        return this.http.get(`${ base_url}/login/renew`,{
            headers: {
                'x-token':token
            }
        }).pipe(
            tap((resp: any)=>{
                localStorage.setItem('token', resp.token)
            }),
            map(resp => true),
            catchError(error => of(false))
        );
    }

    login(formData: LoginForm){

        return this.http.post(`${ base_url}/login`, formData)
                    .pipe(
                        tap((resp: any)=>{
                            localStorage.setItem('token', resp.token)
                        })
                    );
    }
}