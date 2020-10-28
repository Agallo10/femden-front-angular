
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form-interface';
import { catchError, map, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Cuenta } from '../models/cuenta.model';
import { Cuentas } from '../interfaces/cuentas';
import { CuentaForm } from '../interfaces/cuenta-form';
import { Rol } from '../models/rol.model';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class CuentaService {

    public auth2: any;
    public cuenta: Cuenta;


    constructor(private http: HttpClient,
        private ruter: Router) { }


    get token(): string {
        return localStorage.getItem('token') || "";
    }

    get uid(): string {
        return this.cuenta.uid || "";
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    get rol(): any{

        return this.cuenta.rol;
    }

    guardarLocalStorage(token: string, menu: any) {

        localStorage.setItem('token', token);
        localStorage.setItem('menu', JSON.stringify(menu));
    }

    crearCuenta(formData: CuentaForm) {
        return this.http.post(`${base_url}/cuentas`, formData, this.headers);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        this.ruter.navigateByUrl('/login');
    }


    validarToken() {

        return this.http.get(`${base_url}/login/renew`, this.headers)
            .pipe(
                map((resp: any) => {
                    const {
                        nombre,
                        email,
                        rol,
                        uid,
                        imagen = '',
                        google, } = resp.cuenta;

                    this.cuenta = new Cuenta(nombre, email, '', rol, uid, imagen, google);

                    this.guardarLocalStorage(resp.token, resp.menu);

                    return true;
                }),
                catchError(error => of(false))
            );
    }

    actualizarPerfil(data: { nombre: string, rol: any, email: string }) {

        data = {
            ...data,
            rol: this.cuenta.rol,
            email: this.cuenta.email
        }

        return this.http.put(`${base_url}/cuentas/${this.uid}`, data, this.headers);
    }

    login(formData: LoginForm) {

        return this.http.post(`${base_url}/login`, formData)
            .pipe(
                tap((resp: any) => {

                    this.guardarLocalStorage(resp.token, resp.menu);
                })
            );
    }

    getCuentas(desde: number = 0) {

        const url = `${base_url}/cuentas?desde=${desde}`;
        return this.http.get<Cuentas>(url, this.headers)
            .pipe(
                map(resp => {

                    const cuentas = resp.cuentas.map(
                        cuenta => new Cuenta(cuenta.nombre, cuenta.email, '', cuenta.rol, cuenta.uid, cuenta.imagen)
                    );
                    return {
                        total: resp.total,
                        cuentas
                    }
                })
            )
    }

    eliminarCuenta(cuenta: Cuenta) {

        const url = `${base_url}/cuentas/${cuenta.uid}`;
        return this.http.delete(url, this.headers);

    }
}