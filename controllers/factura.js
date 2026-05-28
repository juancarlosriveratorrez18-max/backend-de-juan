import { FacturaModel, crearFactura, actualizarFactura, eliminarFactura } from '../models/factura.js';


export const facturas = async (req, res) => {
    const { data, error } = await FacturaModel.obtenerTodos();
    if (error) {
        return res.status(500).json({ error: "Error al obtener las facturas" });
    }
    return res.status(200).json(data);
};


export const crearFacturas = async (req, res) => {
    const { usuario, descripcion, total, id_pedido } = req.body;

    // Validación de datos
    if (!usuario || !descripcion || !total) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const { data, error } = await crearFactura({ usuario, descripcion, total, id_pedido });
    if (error) {
        return res.status(500).json({ error: "Error al crear la factura", detalle: error.message });
    }
    return res.status(201).json({
        message: "Factura creada exitosamente",
        factura: data
    });
};


export const actualizarFacturas = async (req, res) => {
    const { id } = req.params;
    const { usuario, descripcion, total, id_pedido } = req.body;

    if (!usuario || !descripcion || !total) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        const { data, error } = await actualizarFactura(id, { usuario, descripcion, total, id_pedido });
        if (error) {
            return res.status(400).json({ error: "Error al actualizar la factura", detalle: error.message });
        }
        return res.status(200).json({
            message: "Factura actualizada exitosamente",
            factura: data
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};

export const eliminarFacturas = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await eliminarFactura(id);
        if (error) {
            return res.status(400).json({ error: "Error al eliminar la factura", detalle: error.message });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Factura no encontrada" });
        }
        return res.status(200).json({
            message: "Factura eliminada exitosamente",
            factura: data
        });
    } catch (error) {
        return res.status(500).json({ message: "Error del servidor", error: error.message });
    }
};