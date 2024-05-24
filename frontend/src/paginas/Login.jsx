import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../../config/clienteAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();

    const navegador = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            });
            return;
        }

        try {
            // Esto verifica que el usuario y contraseña sean correctos en el backend, nos devuelve el usuario con un token generado
            const { data } = await clienteAxios.post('/usuarios/login', {
                email,
                password,
            });

            setAlerta({});

            // Guaradamos el token en localstorage
            localStorage.setItem('token', data.token);
            // Y ponemos el usuario en el contextAuth
            setAuth(data);

            console.log(data);

            navegador('/proyectos');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">
                Inicia Sesión Y Administra Tus
                <span className="text-slate-700"> Proyectos </span>
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="correo"
                    >
                        Email:
                    </label>
                    <input
                        id="correo"
                        type="email"
                        value={email}
                        placeholder="Email de Registro"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="contrasena"
                    >
                        Password:
                    </label>
                    <input
                        id="contrasena"
                        type="password"
                        value={password}
                        placeholder="Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-sky-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="registrar"
                >
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link
                    className="block text-center my-5 text-slate-500 uppercase text-sm"
                    to="olvide-password"
                >
                    Olvidé Mi Password
                </Link>
            </nav>
        </>
    );
};

export default Login;
