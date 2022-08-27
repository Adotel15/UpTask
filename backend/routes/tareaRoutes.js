
import Express from "express"
import checkAuth from "../middleware/checkAuth.js"

import{
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
} from "../controllers/tareaController.js"

const router = Express.Router()

// Endpoint para agregar tarea
router.post("/",checkAuth, agregarTarea)

// A través del id, puedes obtener, actualizar, o eliminar
router.route("/:id")
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)

router.post("/estado/:id", checkAuth, cambiarEstado)

export default router;