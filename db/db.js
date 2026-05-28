import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config(); 
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: SUPABASE_URL o SUPABASE_KEY no están definidas en el .env");
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const conectaDB = () => {
    console.log("✅ Configuración de Supabase cargada correctamente.");
};