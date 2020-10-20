import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cuenta } from '../models/cuenta.model';
import { Denuncia } from '../models/denuncia.model';
import { Persona } from '../models/persona.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarCuentas(resultados: any[]): Cuenta[] {
    return resultados.map(
      cuenta => new Cuenta(cuenta.nombre, cuenta.email, '', cuenta.rol, cuenta.uid, cuenta.imagen)
    );
  }

  private transformarPersonas(resultados: any[]): Persona[] {
    return resultados.map(
      persona => new Persona(persona.nombre, persona.documento, persona.email, persona.telefono, persona.direccion, persona.rol, persona.uid)
    );
  }

  private transformarDenuncias(resultados: any[]): Denuncia[] {
    return resultados.map(
      denuncia => new Denuncia(denuncia.texto, denuncia.fecha, denuncia.persona,denuncia.estado, denuncia.tipo, denuncia.uid)
    );
  }

  buscar(
    tipo: 'cuentas' | 'personas' | 'denuncias',
    termino: string
  ) {

    const url = `${base_url}/total/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            
            case 'cuentas':
              return this.transformarCuentas(resp.resultados);
              break

            case 'personas':
              return this.transformarPersonas(resp.resultados);
              break
              
              case 'denuncias':
                return this.transformarDenuncias(resp.resultados);
                break

            default:
              return [];
          }
        })
      );
  }

}
