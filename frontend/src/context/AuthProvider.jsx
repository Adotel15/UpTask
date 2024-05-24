import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';

const AuthContext = createContext({
    auth: {},
    cargando: true,
    setAuth: () => {},
});

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    const navegador = useNavigate();

    useEffect(() => {
        autenticarUsuario();
    }, []);

    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setCargando(false);
            return;
        }

        try {
            const { data } = await clienteAxios('/usuarios/perfil', {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setAuth(data.usuario);
        } catch (error) {
            setAuth({});
        } finally {
            setCargando(false);

            if (!window.location.pathname.includes('proyectos')) {
                navegador('/proyectos');
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                cargando,
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
