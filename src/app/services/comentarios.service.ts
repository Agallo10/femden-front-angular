import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ComentarioForm } from '../interfaces/comentario-form';
import { Comentarios } from '../interfaces/comentarios';
import { Comentario } from '../models/comentario.model';


const base_url = environment.base_url;


@Injectable({
    providedIn: 'root'
})
export class ComentariosService {

    public comentarios: Comentario;

    constructor(private http: HttpClient) { }


    get token(): string {
        return localStorage.getItem('token') || "";
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    getComentarios(id: string) {
        const url = `${base_url}/comentarios/${id}`;
        return this.http.get(url, this.headers).pipe(
            map((resp: { ok: boolean, comentarios: Comentario[] }) => resp)
        );
    }

    eliminarComentario(comentario: Comentario) {

        const url = `${base_url}/comentarios/${comentario.uid}`;
        return this.http.delete(url, this.headers);
    }

    crearComentario(formData: ComentarioForm) {
        return this.http.post(`${base_url}/comentarios`, formData, this.headers);
    }

    getComentarios2(id: string) {

        const url = `${base_url}/comentarios/${id}`;
        return this.http.get<Comentarios>(url, this.headers)
            .pipe(
                map(resp => {

                    const comentarios = resp.comentarios.map(
                        comentario => new Comentario(comentario.comentario, comentario.fecha, comentario.cuenta, comentario.denuncia, comentario.uid)
                    );
                    return {
                        
                        comentarios
                    }
                })
            );
    }

}
