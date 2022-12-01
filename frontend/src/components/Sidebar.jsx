
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {

    const { auth } = useAuth()
    return (
        <aside className = "md:w-80 lg:w-96 px-5 py-10">
            <p className = "text-xl font-bold">
                Hola: { auth.nombre }
            </p>

            <Link 
                to= "crear-proyecto"
                className = "bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition duration-300"
            >
                Nuevo Proyecto</Link>
        </aside>
    )
}

export default Sidebar
