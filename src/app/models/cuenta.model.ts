import { environment } from 'src/environments/environment';
import { Rol } from './rol.model';
import { TipoEntidad } from './tipoEntidad.model';

const base_url = environment.base_url;


export class Cuenta {

    constructor(

        public nombre: string,
        public nombreEncargado: string,
        public documento: string,
        public cargo: string,
        public email: string,
        public password: string,
        public rol?: Rol,
        public uid?: string,
        public imagen?: string,
        public google?: boolean,
        public tipoEntidad?: TipoEntidad,

    ) { }

    get imagenUrl(){

        if (!this.imagen) {
            return `${base_url}/uploads/cuentas/no-image`;
        }
        if (this.imagen) {
            
            return `${base_url}/uploads/cuentas/${this.imagen}`;
        }
        return `${base_url}/uploads/cuentas/no-image`;
    }
}