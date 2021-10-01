import { Estado } from './estado.model';
import { Persona } from './persona.model';

interface _DenunciaTipo {
    _id: string;
    nombre: string;
}


export class Denuncia {

    constructor(

        public texto: string,
        public fecha: string,
        public persona: Persona,
        public estado: Estado,
        public tipo: _DenunciaTipo,
        public uid?: string,

    ) { }

}