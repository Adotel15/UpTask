
import { useState } from "react"

const FormularioProyecto = () => {

    const [ nombre, setNombre ] = useState('')
    const [ descripcion, setDescripcion ] = useState('')
    const [ fechaEntrega, setFechaEntrega ] = useState('')
    const [ cliente, setCliente ] = useState('')

    return (
        <form className = "bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

            <div className = "mb-5">
                <label
                    className = "text-gray-700 uppercase font-bold text-sm"
                    htmlFor = "nombre"
                >
                    Nombre Proyecto
                </label>

                <input 
                    id = "nombre"
                    type = "text"
                    value = { nombre }
                    className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder = "Nombre del Proyecto"
                    onChange = { e => setNombre( e.target.value ) }
                />
            </div>

            <div className = "mb-5">
                <label
                    className = "text-gray-700 uppercase font-bold text-sm"
                    htmlFor = "descripcion"
                >
                    Descripción
                </label>

                <textarea 
                    id = "descripcion"
                    value = { descripcion }
                    className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder = "Descripción del Proyecto"
                    onChange = { e => setDescripcion( e.target.value ) }
                />
            </div>

            <div className = "mb-5">
                <label
                    className = "text-gray-700 uppercase font-bold text-sm"
                    htmlFor = "fecha-entrega"
                >
                    Fecha de Entrega
                </label>

                <input 
                    id = "fecha-entrega"
                    type = "date"
                    value = { fechaEntrega }
                    className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange = { e => setFechaEntrega( e.target.value ) }
                />
            </div>

            <div className = "mb-5">
                <label
                    className = "text-gray-700 uppercase font-bold text-sm"
                    htmlFor = "cliente"
                >
                    Nombre Cliente
                </label>

                <input 
                    id = "cliente"
                    type = "text"
                    value = { cliente }
                    className = "border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder = "Nombre del Cliente"
                    onChange = { e => setCliente( e.target.value ) }
                />
            </div>

            <input
                type = "submit"
                value = "Crear Proyecto"
                className = "bg-sky-600 w-full p-3 text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />
            
        </form>
    )
}

export default FormularioProyecto
