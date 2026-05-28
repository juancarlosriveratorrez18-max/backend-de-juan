// 1. Importar dependencias
import express from 'express';
import dotenv from 'dotenv';
import { conectaDB, supabase } from './db/db.js';
import userRoutes from './routes/user.js';
import pedidoRoutes from './routes/pedido.js';
import facturaRoutes from './routes/factura.js';

// 2. Configuración inicial
dotenv.config();
conectaDB();

const app = express();

// 3. Middlewares
app.use(express.json());

// CREAMOS NUESTRA PRIMERA BASE DE DATOS
app.get('/', (req, res) => {
    res.json({
        mensaje: "Bienvenido a mi clase de express",
        estado: "En linea",
        version: "1.0.0"
    });
});

app.get('/saludar', (req, res) => {
    res.json({
        mensaje: "Hola aprendiz",
        hora: new Date().toLocaleTimeString(),
    });
});

app.use('/usuarios', userRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/factura', facturaRoutes);

// definimos el puerto
const port = 3000;
// PONER A ESCUCHAR EL SERVIDOR
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});