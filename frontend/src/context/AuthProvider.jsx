
import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true)

    const navigate = useNavigate() 

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
                    Autorization: `Bearer ${token}`
                }
            }

            try {
                // Esto es lo que nos devuelve el backend cuando le pasamos el token, nos devuelve el usuario
                const { data } = await clienteAxios.get('/usuarios/perfil', config)

                setAuth(data)
                navigate('/proyectos')

            } catch (error) {
                setAuth({})
            } finally {
                setCargando(false)
            }
            

            
            
        }

        autenticarUsuario()

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