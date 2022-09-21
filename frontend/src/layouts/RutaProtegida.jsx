
import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    if (cargando) return 'Cargando...'
    return (
        <>
            { 
                // Si el auth tiene id, pasa sino vuelve a login
                auth._id ? <Outlet /> : <Navigate to= "/" />
            }
        </>
    )
}

export default RutaProtegida
