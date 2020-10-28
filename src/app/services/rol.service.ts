import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class RolService {

  public rol: Rol;

  constructor(private http: HttpClient) { }

  get uid(): string {
    return this.rol.uid || "";
  }

  getRoles() {
    const url = `${base_url}/roles`;
    return this.http.get(url).pipe(
      map((resp:{ok:boolean, roles: Rol[]})=>resp)
    );
  }
}
