
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from 'react-router-dom'

const ProyectoContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [ proyectos, setProyectos ]  = useState([])
    const [ alerta, setAlerta ] = useState({})
    const [ proyecto, setProyecto ] = useState({})
    const [ cargando, setCargando ] = useState(false)
    const [ modalFormularioTarea, setModalFormularioTarea ] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {

        const obtenerProyectos = async () => {

            try {

                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.get('/proyectos', config)
                setProyectos(data)

            } catch(error) {
                setProyectos({})
            }
        }
        return () => obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }


    const submitProyecto = async proyecto => {

        if(proyecto.id) {
            await editarProyecto( proyecto )
        } else {
            await nuevoProyecto( proyecto )
        }    

    }

    const editarProyecto = async proyecto => {

        try {

            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            const proyectosActualizados = proyectos.map( proyectoState => proyectoState._id === data._id ? data : proyectoState)

            setProyectos(proyectosActualizados)

            setAlerta({
                msg: "Proyecto actualizado correctamente",
                error: false
            })
    
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2500)

        } catch ( error ) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {

        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config);

            // Lo guardo directamente en el state para no tener que volver a consultar la Api cada vez
            setProyectos([...proyectos, data])

            setAlerta({
                msg: "Proyecto creado correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2500)

        } catch(error) {
            console.log(error)
        }

    }

    const obtenerProyecto = async id => {

        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const { data } = await clienteAxios.get(`/proyectos/${id}`, config)

            setProyecto( data )

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async (id) => {

        try {

            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            setAlerta({
                msg: data.msg,
                error: false
            })

            const proyectosActualizados = proyectos.filter( proyectoState => proyectoState._id !== id)

            setProyectos(proyectosActualizados)

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 1000) 

        } catch(error) {

        }

    } 

    return (
        <ProyectoContext.Provider
            value={{
                mostrarAlerta,
                alerta,
                submitProyecto,
                proyectos, 
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto
            }}
        >
            { children }
        </ProyectoContext.Provider>
    )
}

export {
    ProyectoProvider
}

export default ProyectoContext