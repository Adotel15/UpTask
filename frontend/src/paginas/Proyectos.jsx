
import useProyecto from "../hooks/useProyecto"

const Proyectos = () => {
    
    const { proyectos } = useProyecto()

    
    return (
        <>
            <h1 className = "text-4xl font-black"> Proyectos </h1>
            
            <div>
                { proyectos.length > 0 ? 
                    <p>Hay proyectos</p> : 
                    <p className = "p-5 text-center text-gray-600 uppercase">No hay proyectos que mostar</p>
                }
            </div>
        </>
    )
}

export default Proyectos
