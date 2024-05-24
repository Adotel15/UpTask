import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../../config/clienteAxios';
import { useNavigate } from 'react-router-dom';

const ProyectoContext = createContext({
    proyecto: {},
    proyectos: [],
    tarea: {},
    alerta: {},
    cargando: true,
    modalFormularioTarea: false,
    modalEliminarTarea: false,
    obtenerProyecto: () => {},
    submitProyecto: () => {},
    eliminarProyecto: () => {},
    submitTarea: () => {},
    mostrarAlerta: () => {},
    eliminarTarea: () => {},
    submitColaborador: () => {},
    setAlerta: () => {},
    handleModalTarea: () => {},
    handleModalTareaEditar: () => {},
    handleModalTareaEliminar: () => {},
});

const ProyectoProvider = ({ children }) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true);

    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);

    const [tarea, setTarea] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        obtenerProyectos();
    }, []);

    const obtenerProyectos = async () => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await clienteAxios.get('/proyectos', config);
            setProyectos(data);
        } catch (error) {
            setProyectos({});
        }
        setCargando(false);
    };

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({});
        }, 5000);
    };

    const submitProyecto = async (proyecto) => {
        if (proyecto.id) {
            await editarProyecto(proyecto);
        } else {
            await nuevoProyecto(proyecto);
        }
    };

    const editarProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.put(
                `/proyectos/${proyecto.id}`,
                proyecto,
                config
            );

            const proyectosActualizados = proyectos.map((proyectoState) =>
                proyectoState._id === data._id ? data : proyectoState
            );

            setProyectos(proyectosActualizados);

            setAlerta({
                msg: 'Proyecto actualizado correctamente',
                error: false,
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    };

    const nuevoProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.post(
                '/proyectos',
                proyecto,
                config
            );

            setProyectos([...proyectos, data]);

            setAlerta({
                msg: 'Proyecto creado correctamente',
                error: false,
            });

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 2500);
        } catch (error) {
            console.log(error);
        }
    };

    const obtenerProyecto = async (id) => {
        console.log('entra');
        setCargando(true);

        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await clienteAxios.get(`/proyectos/${id}`, config);
            console.log(data);

            setProyecto(data);
        } catch (error) {
            console.log(error);
        }

        setCargando(false);
    };

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.delete(
                `/proyectos/${id}`,
                config
            );

            setAlerta({
                msg: data.msg,
                error: false,
            });

            const proyectosActualizados = proyectos.filter(
                (proyectoState) => proyectoState._id !== id
            );

            setProyectos(proyectosActualizados);

            setTimeout(() => {
                setAlerta({});
                navigate('/proyectos');
            }, 1000);
        } catch (error) {}
    };

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    };

    const handleModalTareaEditar = (tarea) => {
        setTarea(tarea);
        setModalFormularioTarea(true);
    };

    const handleModalTareaEliminar = (tarea) => {
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    };

    const crearTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.post('/tareas', tarea, config);

            const proyectoActualizado = { ...proyecto };

            proyectoActualizado.tareas = [...proyecto.tareas, data];
            setProyecto(proyectoActualizado);
            setAlerta({});
            setModalFormularioTarea(false);
        } catch (error) {
            console.log(error);
        }
    };

    const editarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.put(
                `/tareas/${tarea.id}`,
                tarea,
                config
            );

            const proyectoActualizado = { ...proyecto };
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(
                (tareaState) =>
                    tareaState._id === data._id ? data : tareaState
            );

            setProyecto(proyectoActualizado);
            setAlerta({});
            setModalFormularioTarea(false);
        } catch (error) {
            console.log(error);
        }
    };

    const submitTarea = async (tarea) => {
        if (tarea?.id) await editarTarea(tarea);
        else await crearTarea(tarea);
    };

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.delete(
                `/tareas/${tarea._id}`,
                config
            );
            setAlerta({
                msg: data.msg,
                error: false,
            });

            const proyectoActualizado = { ...proyecto };
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
                (tareaState) => tareaState._id !== tarea._id
            );

            setProyecto(proyectoActualizado);

            setModalEliminarTarea(false);
            setTarea({});

            setTimeout(() => {
                setAlerta({});
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const submitColaborador = async (email) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const { data } = await clienteAxios.post(
                `/proyectos/colaboradores`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProyectoContext.Provider
            value={{
                proyecto,
                proyectos,
                tarea,
                alerta,
                cargando,
                modalFormularioTarea,
                modalEliminarTarea,
                obtenerProyecto,
                submitProyecto,
                eliminarProyecto,
                submitTarea,
                mostrarAlerta,
                eliminarTarea,
                submitColaborador,
                setAlerta,
                handleModalTarea,
                handleModalTareaEditar,
                handleModalTareaEliminar,
            }}
        >
            {children}
        </ProyectoContext.Provider>
    );
};

export { ProyectoProvider };

export default ProyectoContext;
