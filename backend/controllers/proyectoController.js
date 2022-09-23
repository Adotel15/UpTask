
import Proyecto from "../models/Proyectos.js"
import Tareas from "../models/Tarea.js"

const obtenerProyectos = async (req, res) => {

    // Como que en la Auth guardamos el usuario en el req, lo comparamos aqui con
    // where("creador").equals(req.usuario)
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
    res.json(proyectos)

}

const nuevoProyecto = async (req, res) => {
    // Instancia para crear Proyecto nuevo desde la Instancia, y le asignamos el body
    const proyecto = new Proyecto(req.body)
    // Asignamos al creador al proyecto
    proyecto.creador = req.usuario._id

    try{
        // Guardamos en la base de datos
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)

    } catch(error){
        console.log(error)
    }

}

const obtenerProyecto = async (req, res) => {

    // Cogemos el id del url
    const { id } = req.params
    
    const proyecto = await Proyecto.findById(id)

    if(!proyecto) {
        const error = new Error("Proyecto No Encontrado")
        return res.status(404).json({ msg: error.message })
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción No Válida")
        return res.status(401).json({ msg: error.message })
    }

    res.json ( proyecto )
}

const editarProyecto = async (req, res) => {
     // Cogemos el id del url
     const { id } = req.params
    
     const proyecto = await Proyecto.findById(id)
 
     if(!proyecto) {
         const error = new Error("Proyecto No Encontrado")
         return res.status(404).json({ msg: error.message })
     }
 
     if(proyecto.creador.toString() !== req.usuario._id.toString()){
         const error = new Error("Acción No Válida")
         return res.status(401).json({ msg: error.message })
     }
 
     // El nombre de las variables del proyecto, se pondran igual a lo que haya en el body
     // solo si existe, si no, se mantienen igual
     proyecto.nombre = req.body.nombre || proyecto.nombre;
     proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
     proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
     proyecto.cliente = req.body.cliente || proyecto.cliente;

     try {
        
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)

     } catch(error){
        console.log(error)
     }
}

const eliminarProyecto = async (req, res) => {

    // Cogemos el id del url
    const { id } = req.params
    
    const proyecto = await Proyecto.findById(id)

    if(!proyecto) {
        const error = new Error("Proyecto No Encontrado")
        return res.status(404).json({ msg: error.message })
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción No Válida")
        return res.status(401).json({ msg: error.message })
    }

    try{
        await proyecto.deleteOne();

        res.json({
            msg: "Proyecto eliminado"
        })

    } catch(error) {
        console.log(error)
    }
    
}

const agregarColaborador = async (req, res) => {
    
}

const eliminarColaborador = async (req, res) => {
    
}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
}