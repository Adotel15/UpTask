
import { useContext } from "react";
import ProyectoContext from "../context/ProyectoProvider";

const useProyecto = () => useContext(ProyectoContext)

export default useProyecto;