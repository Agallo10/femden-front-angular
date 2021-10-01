import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TipoEntidad } from '../models/tipoEntidad.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TipoEntidadService {

  public tipoEntidades: TipoEntidad;

  constructor(private http: HttpClient) { }

  get uid(): string {
    return this.tipoEntidades.uid || "";
  }

  getTipos() {
    const url = `${base_url}/tipo-entidad`;
    return this.http.get(url).pipe(
      map((resp:{ok:boolean, tipoEntidades: TipoEntidad[]})=>resp)
    );
  }
}
