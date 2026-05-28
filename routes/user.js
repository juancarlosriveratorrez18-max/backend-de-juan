import {Router} from "express";

//importamos la logica 
import {usuarios,crearUsuarios,actualizarUsuarios,eliminarUsuarios} from "../controllers/user.js";

const router=Router();

//definimos las rutas para los usuarios
router.get("/",usuarios);
router.post("/crear",crearUsuarios);
router.put("/actualizar/:id",actualizarUsuarios);
router.delete("/eliminar/:id",eliminarUsuarios);

export default router;