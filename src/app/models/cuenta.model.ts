

export class Cuenta {

    constructor(

        public nombre: string,
        public email: string,
        public password: string,
        public rol: string,
        public uid: string,
        public google?: boolean,

    ) { }
}