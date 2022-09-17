
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'

const Registrar = () => {

    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [ alerta, setAlerta ] = useState('')

    const handleSubmit = async e => {

        e.preventDefault();

        // Validaciones 
        if( [nombre, email, password, repetirPassword].includes('') ){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return 
        }

        if (password !== repetirPassword) {
            setAlerta({
                msg: "Los passwords no coinciden",
                error: true
            })
        }

        if (password.length < 6) {
            setAlerta({
                msg: "Password poco seguro",
                error: true
            })
        }

        setAlerta({})

        // Se han pasado las validaciones
        try {
            // TODO: Mover a cliente axios
            const { data } = await axios.post(` ${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, 
            {
                nombre,
                email,
                password
            })

            setAlerta({
                msg: data.msg,
                error: false
            })

            // Ya se ha creado el usuario
            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')

        } catch (error) {
            // error.response coge el texto error que hemos puesto en el backend
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    // En caso de que existe msg se va a llenar
    const { msg } = alerta


    return (
          <>
            <h1 className = "text-sky-600 font-black text-6xl">
                Crea Tu Cuenta Y Administra Tus
                <span className = "text-slate-700"> Proyectos </span> 
            </h1>

            { msg && <Alerta alerta = {alerta} /> }

            <form 
                className = "my-10 bg-white shadow rounded-lg p-10"
                onSubmit = {handleSubmit}
            >

            <div className = "my-5">
                    <label 
                        className = "uppercase text-gray-600 block text-xl font-bold"
                        htmlFor = "nombre"
                        >
                            Nombre:
                    </label>
                    <input
                        id = "nombre"
                        type = "text"
                        placeholder = "Nombre de Usuario" 
                        className = "w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value = {nombre}
                        onChange = { e => setNombre(e.target.value)}
                    />
                </div>

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
                        value = {email}
                        onChange = { e => setEmail(e.target.value)}
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
                        placeholder = "Introduce Password" 
                        className = "w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value = {password}
                        onChange = { e => setPassword(e.target.value)}
                    />
                </div>

                <div className = "my-5">
                    <label 
                        className = "uppercase text-gray-600 block text-xl font-bold"
                        htmlFor = "Rcontrasena"
                        >
                            Repetir Password: 
                    </label>
                    <input
                        id = "Rcontrasena"
                        type = "password"
                        placeholder = "Repite el Password" 
                        className = "w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value = {repetirPassword}
                        onChange = { e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input 
                    type = "submit"
                    value = "Crear Cuenta"
                    className = "bg-sky-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                
                />
            </form>

            <nav className = "lg:flex lg:justify-between">

            <Link
                    className = 'block text-center my-5 text-slate-500 uppercase text-sm'
                    to = "/"
                >
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

                <Link
                    className = 'block text-center my-5 text-slate-500 uppercase text-sm'
                    to = "/olvide-password"
                >
                    Olvidé Mi Password
                </Link>

            </nav>
        </>
    )
}

export default Registrar
