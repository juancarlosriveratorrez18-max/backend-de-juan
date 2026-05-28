import { supabase } from '../db/db.js';

export const PedidoModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("pedidos")
            .select("*");
        return { data, error };
    }
};

export const crearPedido = async ({ nombre_producto, detalle_producto, precio, id_use }) => {
    const { data, error } = await supabase
        .from("pedidos")
        .insert({ nombre_producto, detalle_producto, precio, id_use })
        .select("*");
    return { data, error };
};

export const actualizarPedido = async (id, { nombre_producto, detalle_producto, precio, id_use }) => {
    const { data, error } = await supabase
        .from("pedidos")
        .update({ nombre_producto, detalle_producto, precio, id_use })
        .eq("id", Number(id))
        .select("*")
        .single();
    return { data, error };
};

export const eliminarPedido = async (id) => {
    const { data, error } = await supabase
        .from("pedidos")
        .delete()
        .eq("id", Number(id))
        .select("*");
    return { data, error };
};