
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyecto"
import { Link } from "react-router-dom"

const Proyecto = () => {

    const par = useParams()

    const { obtenerProyecto, proyecto, cargando } = useProyecto()
    
    const { nombre } = proyecto

    useEffect(() => {

        obtenerProyecto(par.id)

    }, [])

    if(cargando) 
    return 
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-700 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-500 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-500 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-500 rounded"></div>
                    </div>
                </div>
            </div>
        </div>


    return (
        <div className = "flex justify-between">
            <h1 className = "font-black text-4xl"> { nombre } </h1>
            <div className = "flex items-center gap-2 text-gray-400 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

                <Link
                    to = {`/proyectos/editar/${par.id}`}
                    className = "uppercase font-bold"
                >
                    Editar
                </Link>
            </div>
        </div>
    )
}

export default Proyecto
