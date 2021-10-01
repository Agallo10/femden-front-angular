import { Denuncia } from './denuncia.model';
import { Cuenta } from './cuenta.model';




export class Comentario {

    constructor(

        public comentario: string,
        public fecha: string,
        public cuenta: Cuenta,
        public denuncia: Denuncia,
        public uid?: string,

    ) { }

}