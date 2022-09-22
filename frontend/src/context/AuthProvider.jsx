
import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true)

    const navegador = useNavigate() 

    // Este useEffect es para cuando se cargue la pagina mire si hay un token en el localstorage y entre directamente
    useEffect(() => {

        const autenticarUsuario = async () => {

            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            }

            // Para enviar la Auth junto con el request Http se necesita config que tenga headers
            // En nuestra app es Bearer
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Esto es lo que nos devuelve el backend cuando le pasamos el token, nos devuelve el usuario
                const { data } = await clienteAxios('/usuarios/perfil', config)

                setAuth(data)
                navegador('/proyectos')

            } catch (error) {
                setAuth({})
            }

            setCargando(false)
            
            
            
        }
        return () => autenticarUsuario()

    },[])


    return (
        <AuthContext.Provider
            value = {{
                setAuth,
                auth, 
                cargando
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;