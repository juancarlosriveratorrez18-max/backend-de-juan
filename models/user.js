import { supabase } from '../db/db.js';

export const UserModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*");
        return { data, error };
    }
};

export const crearUser = async ({ nombre, email, rol }) => {
    const { data, error } = await supabase
        .from("usuarios")
        .insert({ nombre, email, rol })
        .select("*");
    return { data, error };
};

export const actualizarUser = async (id, { nombre, email, rol }) => {
    const { data, error } = await supabase
        .from("usuarios")
        .update({ nombre, email, rol })
        .eq("id", Number(id))
        .select("*")
        .single();
    return { data, error };
};

export const eliminarUser = async (id) => {
    const { data, error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", Number(id))
        .select("*");
    return { data, error };
};