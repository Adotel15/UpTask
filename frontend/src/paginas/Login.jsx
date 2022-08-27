
import { Link } from 'react-router-dom'

const Login = () => {

    return (
        <>
            <h1 className = "text-sky-600 font-black text-6xl">
                Inicia Sesión Y Administra Tus 
                <span className = "text-slate-700"> Proyectos </span> 
            </h1>

            <form className = "my-10 bg-white shadow rounded-lg p-10">
                <div className = "my-5">
                    <label 
                        className = "uppercase text-gray-600 block text-xl font-bold"
                        htmlFor = "correo"
                        >
                            Email: 
                    </label>
                    <input
                        id = "correo"
                        type = "email"
                        placeholder = "Email de Registro" 
                        className = "w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <div className = "my-5">
                    <label 
                        className = "uppercase text-gray-600 block text-xl font-bold"
                        htmlFor = "contrasena"
                        >
                            Password: 
                    </label>
                    <input
                        id = "contrasena"
                        type = "password"
                        placeholder = "Password" 
                        className = "w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <input 
                    type = "submit"
                    value = "Iniciar Sesión"
                    className = "bg-sky-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                
                />
            </form>

            <nav className = "lg:flex lg:justify-between">
                <Link
                    className = 'block text-center my-5 text-slate-500 uppercase text-sm'
                    to = "registrar"
                >
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link
                    className = 'block text-center my-5 text-slate-500 uppercase text-sm'
                    to = "olvide-password"
                >
                    Olvidé Mi Password
                </Link>

            </nav>
        </>
    )
}

export default Login
