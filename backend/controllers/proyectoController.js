import Proyecto from '../models/Proyectos.js';
import Tareas from '../models/Tarea.js';

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find()
        .where('creador')
        .equals(req.usuario)
        .select('-tareas');

    res.json(proyectos);
};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findById(id).populate('tareas');

    if (!proyecto) {
        const error = new Error('Proyecto No Encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción No Válida');
        return res.status(401).json({ msg: error.message });
    }

    res.json(proyecto);
};

const editarProyecto = async (req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
        const error = new Error('Proyecto No Encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción No Válida');
        return res.status(401).json({ msg: error.message });
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarProyecto = async (req, res) => {
    const { id } = req.params;

    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
        const error = new Error('Proyecto No Encontrado');
        return res.status(404).json({ msg: error.message });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción No Válida');
        return res.status(401).json({ msg: error.message });
    }

    try {
        await proyecto.deleteOne();

        res.json({
            msg: 'Proyecto eliminado',
        });
    } catch (error) {
        console.log(error);
    }
};

const buscarColaborador = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
};

const agregarColaborador = async (req, res) => {
    try {
    } catch (error) {
        console.log(error.response);
    }
};

const eliminarColaborador = async (req, res) => {};

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    buscarColaborador,
};
