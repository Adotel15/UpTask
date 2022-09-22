
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from 'react-router-dom'

const ProyectoContext = createContext()

const ProyectoProvider = ({ children }) => {

    const [ proyectos, setProyectos ]  = useState([])
    const [ alerta, setAlerta ] = useState([])

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

            console.log(data)

            setAlerta({
                msg: "Proyecto creado correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)

        } catch(error) {
            console.log(error)
        }
    }
    return (
        <ProyectoContext.Provider
            value={{
                mostrarAlerta,
                alerta,
                submitProyecto,
                proyectos
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