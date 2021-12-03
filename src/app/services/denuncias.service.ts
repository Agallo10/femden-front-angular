import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Denuncias } from '../interfaces/denuncias';
import { Denuncia } from '../models/denuncia.model';
import { Grafica } from '../models/graficas.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class DenunciasService {

  public denuncia: Denuncia;

  constructor(private http: HttpClient,
    private ruter: Router) { }

  get token(): string {
    return localStorage.getItem('token') || "";
  }

  get uid(): string {
    return this.denuncia.uid || "";
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  getDenuncias(desde: number = 0) {

    const url = `${base_url}/denuncias?desde=${desde}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean, denuncias: Denuncia[], total: number }) => resp)
    );
  }

  getDenunciasTipo(desde: number = 0, tipo: string) {

    const url = `${base_url}/denuncias/denuncia-tipo/${tipo}?desde=${desde}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean, denuncias: Denuncia[], total: number }) => resp)
    );
  }

  getDenunciaUid(id: string) {

    const url = `${base_url}/denuncias/denuncia/${id}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean, denuncia: Denuncia }) => resp.denuncia)
    );
  }
  getGraficas() {
    const url = `${base_url}/denuncias/denuncia-datos/a`;
    return this.http.get(url, this.headers).pipe(
      map((resp: { ok: boolean, graficas: Grafica,  }) => resp.graficas)
    );
  }

  actualizarEstado(id: string, estado: string) {

    return this.http.put(`${base_url}/denuncias/${id}`, estado, this.headers);
  }

  actualizarEstado2(id: string, estado: string) {

    return this.http.put(`${base_url}/denuncias/finalizar/${id}`, estado, this.headers);
  }

  agregarNumeroRadicado(id: string, numeroRadicado: string) {

    return this.http.put(`${base_url}/denuncias/radicar/${id}`, numeroRadicado, this.headers);
  }
  

}
