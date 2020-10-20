import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Personas } from '../interfaces/personas';
import { Persona } from '../models/persona.model';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  public persona: Persona

  constructor(private http: HttpClient,
    private ruter: Router) { }

  get token(): string {
    return localStorage.getItem('token') || "";
  }

  get uid(): string {
    return this.persona.uid || "";
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getPersonass(desde: number = 0) {

    const url = `${base_url}/personas?desde=${desde}`;
    return this.http.get<Personas>(url, this.headers);
  }

  eliminarPersona(persona: Persona) {

    const url = `${base_url}/personas/${persona.uid}`;
    return this.http.delete(url, this.headers);

  }
}

