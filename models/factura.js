import { supabase } from '../db/db.js';

// Obtener todas las facturas
export const FacturaModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("factura")
            .select("*");
        return { data, error };
    }
};

// Crear una nueva factura
export const crearFactura = async ({ usuario, descripcion, total, id_pedido }) => {
    const { data, error } = await supabase
        .from("factura")
        .insert({ usuario, descripcion, total, id_pedido })
        .select("*")
        .single();
    return { data, error };
};

// Actualizar factura
export const actualizarFactura = async (id, { usuario, descripcion, total, id_pedido }) => {
    const { data, error } = await supabase
        .from("factura")
        .update({ usuario, descripcion, total, id_pedido })
        .eq("id_factura", id)
        .select("*")
        .single();
    return { data, error };
};

// Eliminar factura
export const eliminarFactura = async (id) => {
    const { data, error } = await supabase
        .from("factura")
        .delete()
        .eq("id_factura", id)
        .select("*")
        .single();
    return { data, error };
};