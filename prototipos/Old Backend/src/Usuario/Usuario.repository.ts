import { Usuario } from "./Usuario.js";
import { db } from "../Shared/db/conn.mongo.js";
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";

const usuarios = db.collection<Usuario>('usuarios');

export class UsuarioRepository {


    public async findAll(): Promise<Usuario[] | undefined> {
        try {
            return await usuarios.find().toArray()
        } catch (error) {
            console.error("Error en findAll:", error);
            throw error;
        }
    }

    public async findOne(item: { [key: string]: any }): Promise<Usuario | undefined> {
        try {
            const result = await usuarios.findOne(item);
            return result ? result : undefined;
        } catch (error) {
            console.error("Error en findOne:", error);
            throw error;
        }
    }

    public async findOneByEmail(item: { email: string }): Promise<Usuario | undefined> {
        try {
            const usuario = await usuarios.findOne({ email: item.email });
            return usuario || undefined;
        } catch (error) {
            console.error("Error en findOneByEmail:", error);
            throw error;
        }
    }

    public async add(item: Usuario): Promise<Usuario | undefined> {
        try {
            // Cifrar la contraseña antes de almacenarla
            const hashContraseña = await bcrypt.hash(item.contraseña, 10);
            item.contraseña = hashContraseña;

            // Insertar el usuario en la base de datos
            item._id = (await usuarios.insertOne(item)).insertedId;
            return item;
        } catch (error) {
            console.error("Error en add:", error);
            throw error;
        }
    }

    public async update(id: string | ObjectId, item: Usuario): Promise<Usuario | undefined> {
        try {
            console.log('Entrando en update');
            const _id = id instanceof ObjectId ? id : new ObjectId(id);
            return (await usuarios.findOneAndUpdate({ _id }, { $set: item }, { returnDocument: 'after' })) || undefined;
        } catch (error) {
            console.error("Error en update:", error);
            throw error;
        }
    }

    public async delete(item: { id: string; }): Promise<Usuario | undefined> {
        try {
            const _id = new ObjectId(item.id)
            return (await usuarios.findOneAndDelete({ _id })) || undefined
        } catch (error) {
            console.error("Error en delete:", error);
            throw error;
        }
    }

    async getByUsername(username: string): Promise<Usuario | undefined> {
        try {
            const usuario = await usuarios.findOne({ username });
            return usuario || undefined;
        } catch (error) {
            console.error("Error en getByUsername:", error);
            throw error;
        }
    }

    async getById(userId: string): Promise<Usuario | undefined> {
        try {
            const objectId = new ObjectId(userId);
            const usuario = await usuarios.findOne({ _id: objectId });
            return usuario || undefined;
        } catch (error) {
            console.error("Error en getById:", error);
            throw error;
        }
    }

    async getByToken(token: string): Promise<Usuario | undefined> {
        try {
            const usuario = await usuarios.findOne({ "tokens.token": token });
            return usuario || undefined;
        } catch (error) {
            console.error("Error en getByToken:", error);
            throw error;
        }
    }

    public async updateAttribute(id: string | ObjectId, attribute: string, value: any): Promise<Usuario | undefined> {
        try {
            console.log('Entrando en updateAttribute');
            const _id = id instanceof ObjectId ? id : new ObjectId(id);
            const updateQuery: any = {};
            updateQuery[attribute] = value;
            return (await usuarios.findOneAndUpdate({ _id }, { $set: updateQuery }, { returnDocument: 'after' })) || undefined;
        } catch (error) {
            console.error("Error en updateAttribute:", error);
            throw error;
        }
    }
}