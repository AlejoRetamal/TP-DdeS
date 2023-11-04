import { ObjectId } from 'mongodb';

export class Libro{
    constructor(
        public  id:number, 
        public isbn: string, 
        public titulo: string,
        public idioma: string,
        public descripcion: string,
        public precio: number,
        public fecha_edicion: Date,
        public autores: string[],
        public editorial: string,
        public categorias: string[],
        public formatos: string[],
        public _id?: ObjectId,
        ){}
}