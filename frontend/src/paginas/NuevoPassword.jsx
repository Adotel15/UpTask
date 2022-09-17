
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const [ alerta, setAlerta ] = useState({})
    const Params = useParams()

    useEffect(() => {

        const comprobarToken = async () => {

            try {

                await axios('http://localhost:4000/api/usuarios/olvide_password/')

            } catch (error) {
                setAlerta({})
            }
        }

    }, [])
    
    return (
        <>
            <h1 className = "text-sky-600 font-black text-5xl">
                Reestablecer 
                <span className = "text-slate-700"> Contraseña </span> 
            </h1>

            <form className = "my-10 bg-white shadow rounded-lg p-10">

           
                <div className = "my-5">
                    <label 
                        className = "uppercase text-gray-600 block text-xl font-bold"
                        htmlFor = "contrasena"
                        >
                            Nuevo Password: 
                    </label>
                    <input
                        id = "contrasena"
                        type = "password"
                        placeholder = "Introduce Nuevo Password" 
                        className = "w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    />
                </div>

                <input 
                    type = "submit"
                    value = "Reestablecer Contraseña"
                    className = "bg-sky-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                
                />
            </form>
        </>
    )
}

export default NuevoPassword
