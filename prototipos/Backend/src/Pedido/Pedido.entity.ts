import { Double, ObjectId } from 'mongodb';

export class Compra {
    constructor(
        public libro: ObjectId[],
        public fecha: Date,
        public usuario: ObjectId,
        public _id?: ObjectId
    ) { }
}