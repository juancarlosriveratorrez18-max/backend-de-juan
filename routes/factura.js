import { Router } from "express";
import { facturas, crearFacturas, actualizarFacturas, eliminarFacturas } from "../controllers/factura.js";

const router = Router();

router.get("/", facturas);
router.post("/crear", crearFacturas);
router.put("/actualizar/:id", actualizarFacturas);
router.delete("/eliminar/:id", eliminarFacturas);

export default router;