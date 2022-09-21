
// Dependencias
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Layouts
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
// Páginas
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'

import Proyectos from './paginas/Proyectos'


import { AuthProvider } from './context/AuthProvider'

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = { <AuthLayout /> }>
                        <Route index element = { <Login /> }/>
                        <Route path = "registrar" element = { <Registrar /> }/>
                        <Route path = "olvide-password" element = { <OlvidePassword /> }/>
                        <Route path = "olvide-password/:token" element = { <NuevoPassword /> }/>
                        <Route path = "confirmar/:id" element = { <ConfirmarCuenta /> }/>
                    </Route>

                    {/* Todas las rutas de proyecto necesitan Auth asi que creamos un componente para proteger rutas*/}
                    <Route path = '/proyectos' element = { <RutaProtegida /> }>
                        <Route index element = { <Proyectos /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
