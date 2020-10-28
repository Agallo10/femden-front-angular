import { environment } from 'src/environments/environment';
import { Rol } from './rol.model';

const base_url = environment.base_url;


export class Cuenta {

    constructor(

        public nombre: string,
        public email: string,
        public password: string,
        public rol?: Rol,
        public uid?: string,
        public imagen?: string,
        public google?: boolean,

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