import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Denuncias } from '../interfaces/denuncias';
import { Denuncia } from '../models/denuncia.model';


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
      map((resp:{ok:boolean, denuncias: Denuncia[], total:number})=>resp)
    );
  }
}
