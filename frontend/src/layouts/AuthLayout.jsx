
import { Outlet } from 'react-router-dom'
// Outlet sirve para que las route que estén dentro de esta route, se imprimen donde el outlet
// Algo asi como tener un Layout e imprimir un children

const AuthLayout = () => {

    return (
        <>
            <main className = 'container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
                <div className = 'md:w-2/3 lg:w-2/5'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default AuthLayout
