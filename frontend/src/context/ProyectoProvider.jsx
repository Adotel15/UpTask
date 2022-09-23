
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from 'react-router-dom'

const ProyectoContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [ proyectos, setProyectos ]  = useState([])
    const [ alerta, setAlerta ] = useState({})
    const [ proyecto, setProyecto ] = useState({})
    const [ cargando, setCargando ] = useState(false)
    
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
            setProyectos([...proyecto, data])

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
                "Content-Type": "application/json",                    Authorization: `Bearer ${token}`
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

    return (
        <ProyectoContext.Provider
            value={{
                mostrarAlerta,
                alerta,
                submitProyecto,
                proyectos, 
                obtenerProyecto,
                proyecto,
                cargando
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