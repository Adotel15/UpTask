
import Express from "express"
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador
} from "../controllers/proyectoController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = Express.Router()

router
    .route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

router
    .route("/:id")
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)

router
    .post("/colaboradores", checkAuth, buscarColaborador)
    .post("/colaboradores/:id", checkAuth, agregarColaborador)
    .delete("/colaboradores/:id", checkAuth, eliminarColaborador)

export default router;