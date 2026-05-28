import { PedidoModel, crearPedido, actualizarPedido, eliminarPedido } from '../models/pedido.js';

export const pedidos = async (req, res) => {
    const { data, error } = await PedidoModel.obtenerTodos();
    if (error) {
        return res.status(500).json({ error: "Error al obtener los pedidos" });
    }
    return res.status(200).json(data);
};

export const crearPedidos = async (req, res) => {
    const { nombre_producto, detalle_producto, precio, id_use } = req.body;

    if (!nombre_producto || !detalle_producto || !precio) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const { data, error } = await crearPedido({ nombre_producto, detalle_producto, precio, id_use });
    if (error) {
        return res.status(500).json({ error: "Error al crear el pedido", detalle: error.message });
    }
    return res.status(201).json({
        message: "Pedido creado exitosamente",
        pedido: data[0]
    });
};

export const actualizarPedidos = async (req, res) => {
    const { id } = req.params;
    const { nombre_producto, detalle_producto, precio, id_use } = req.body;

    if (!nombre_producto || !detalle_producto || !precio) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const { data, error } = await actualizarPedido(id, { nombre_producto, detalle_producto, precio, id_use });
        if (error) {
            return res.status(400).json({ error: "Error al actualizar el pedido", detalle: error.message });
        }
        return res.status(200).json({
            message: "Pedido actualizado exitosamente",
            pedido: data
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const eliminarPedidos = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await eliminarPedido(id);
        if (error) {
            return res.status(400).json({ error: "Error al eliminar el pedido", detalle: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        return res.status(200).json({
            message: "Pedido eliminado exitosamente",
            pedido: data[0]
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};