import { Router } from "express";
import { pedidos, crearPedidos, actualizarPedidos, eliminarPedidos } from "../controllers/pedido.js";

const router = Router();

router.get("/", pedidos);
router.post("/crear", crearPedidos);
router.put("/actualizar/:id", actualizarPedidos);
router.delete("/eliminar/:id", eliminarPedidos);

export default router;