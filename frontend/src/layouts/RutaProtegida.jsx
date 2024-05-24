import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const RutaProtegida = () => {
    const [renderSidebar, setRenderSidebar] = useState(true);

    const location = useLocation();
    const { cargando, auth } = useAuth();

    useEffect(() => {
        if (location.pathname === '/proyectos' && !renderSidebar) {
            setRenderSidebar(true);
        } else if (location.pathname !== '/proyectos' && renderSidebar) {
            setRenderSidebar(false);
        }
    }, [location]);

    if (cargando)
        return (
            <h1 className="w-full h-[100vh] flex justify-center items-center text-3xl text-cyan-700">
                Cargando...
            </h1>
        );
    else if (!auth._id) return <Navigate to="/" />;
    else
        return (
            <div className="bg-gray-100 w-full">
                <Header />
                <div className="md:flex md:min-h-screen">
                    {renderSidebar && <Sidebar />}
                    <main className="my-[] flex-1 p-10">
                        <Outlet />
                    </main>
                </div>
                ç
            </div>
        );
};

export default RutaProtegida;
