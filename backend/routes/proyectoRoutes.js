
import Express from "express"
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from "../controllers/proyectoController.js"
import checkAuth from "../middleware/checkAuth.js"

const router = Express.Router()

/*// 
////    Ruta /api/proyectos 
*///
router
    .route("/")
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

/*//
/////     Ruta /api/proyectos/:id
*///

router
    .route("/:id")
    .get(checkAuth, obtenerProyecto)
    // .put es para editar la base de datos de un proyecto ya creado
    .put(checkAuth, editarProyecto)
    // .delete para eliminar un proyecto, como que es un recurso completo es delete
    .delete(checkAuth, eliminarProyecto)

/*//
/////     Ruta /api/proyectos/tareas/:id
*///

router
    .get("tareas/:id", checkAuth, obtenerTareas)

/*//
/////     Ruta /api/proyectos/agregar-colaborador/:id
*///


router
    .post("/agregar-colaborador/:id", checkAuth, agregarColaborador)

/*//
/////     Ruta /api/proyectos//eliminar-colaborador/:id
*///



router
    // Eliminar colaborador no es eliminar todo un recurso asi que usamos .post
    .post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador)

export default router;