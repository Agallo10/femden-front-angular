

export class Persona {

    constructor(

        public nombre: string,
        public documento: string,
        public email: string,
        public telefono: number,
        public direccion: string,
        public rol?: string,
        public uid?: string,

    ) { }

}