
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyecto from "../hooks/useProyecto"

const Proyecto = () => {

    const par = useParams()

    const { obtenerProyecto, proyecto, cargando } = useProyecto()
    
    const { nombre } = proyecto

    useEffect(() => {

        obtenerProyecto(par.id)

    }, [])

    return (

        cargando ? 
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
            :
            <div>
                <h1 className = "font-black text-4xl"> { nombre } </h1>
            </div>
    )
}

export default Proyecto
