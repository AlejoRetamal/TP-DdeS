import { UsuarioRepository } from "./Usuario.repository.js";
import { Usuario } from "./Usuario.js";
import { ObjectId } from "mongodb";
const repository = new UsuarioRepository();
async function sanitizeInput(req, res, next) {
    try {
        req.body.sanitizedInput = {
            id: req.body.id,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            direccion: req.body.direccion,
            localidad: req.body.localidad,
            avatar: req.body.avatar,
            tipo: req.body.tipo,
        };
        // Eliminar claves no definidas
        Object.keys(req.body.sanitizedInput).forEach(key => {
            if (req.body.sanitizedInput[key] === undefined) {
                delete req.body.sanitizedInput[key];
            }
        });
        next();
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function findAll(req, res) {
    try {
        res.json({ data: await repository.findAll() });
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const usuario = await repository.findOne({ id });
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.json({ data: usuario });
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function add(req, res) {
    try {
        const input = req.body.sanitizedInput;
        const usuarioInput = new Usuario(input.id, input.nombre, input.apellido, input.email, input.direccion, new ObjectId(input.localidad), input.avatar, input.tipo);
        const usuario = await repository.add(usuarioInput);
        res.status(201).send({ message: 'Usuario agregado con éxito.', data: usuario });
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function update(req, res) {
    try {
        const usuario = await repository.update(req.params.id, req.body.sanitizedInput);
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado." });
        }
        return res.status(200).send({ message: 'Usuario actualizado con éxito.', data: usuario });
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const usuario = await repository.delete({ id });
        if (!usuario) {
            res.status(404).send({ message: "Usuario no encontrado." });
        }
        res.status(204).send({ message: 'Usuario eliminado con éxito.' });
    }
    catch (error) {
        res.status(500).send({ message: "Error interno del servidor." });
    }
}
export { sanitizeInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=Usuario.controller.js.map