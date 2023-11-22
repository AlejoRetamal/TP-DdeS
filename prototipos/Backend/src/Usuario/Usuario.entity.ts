import { ObjectId } from "mongodb";

export class Usuario {
    constructor(
        public username: string,
        public nombre: string,
        public apellido: string,
        public email: string,
        public direccion: string,
        public localidad: ObjectId,
        public avatar: string,
        public tipo: string,
        public contraseña: string,
        public tokens: Token[],
        public tokensRevocados: TokenRevocado[],
        public _id?: ObjectId
    ) { }
}

export interface Token {
    token: string;
    fechaExpiracion: Date;
}

export interface TokenRevocado {
    token: string;
    fechaRevocacion: Date;
}
