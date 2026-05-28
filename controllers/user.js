import { UserModel, crearUser, actualizarUser, eliminarUser } from '../models/user.js';

export const usuarios = async (req, res) => {
    const { data, error } = await UserModel.obtenerTodos();
    if (error) {
        return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    return res.status(200).json(data);
};

export const crearUsuarios = async (req, res) => {
    const { nombre, email, rol } = req.body;

    if (!nombre || !email || !rol) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const { data, error } = await crearUser({ nombre, email, rol });
    if (error) {
        return res.status(500).json({ error: "Error al crear el usuario", detalle: error.message });
    }
    return res.status(201).json({
        message: "Usuario creado exitosamente",
        usuario: data[0]
    });
};

export const actualizarUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    if (!nombre || !email || !rol) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const { data, error } = await actualizarUser(id, { nombre, email, rol }); // ✅ objeto
        if (error) {
            return res.status(400).json({ error: "Error al actualizar el usuario", detalle: error.message });
        }
        return res.status(200).json({
            message: "Usuario actualizado exitosamente",
            usuario: data
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const eliminarUsuarios = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await eliminarUser(id);
        if (error) {
            return res.status(400).json({ error: "Error al eliminar el usuario", detalle: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json({
            message: "Usuario eliminado exitosamente",
            usuario: data[0]
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};