
import useProyecto from "../hooks/useProyecto"
import PreviewProyecto from "../components/PreviewProyecto"

const Proyectos = () => {
    
    const { proyectos } = useProyecto()

    
    return (
        <>
            <h1 className = "text-xl font-black"> Proyectos </h1>
            
            <div className = "bg-white shadow mt-10 rounded-lg border-black">
                { proyectos.length ? 
                    proyectos.map( proyecto => (
                        <PreviewProyecto
                            key = {proyecto._id}
                            proyecto = {proyecto}
                        />
                    ))
                    :
                    <p className = "p-5 text-center text-gray-600 uppercase">No hay proyectos que mostar</p>
                }
            </div>
        </>
    )
}

export default Proyectos
