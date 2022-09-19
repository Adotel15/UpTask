
import axios from 'axios'


// Para que todas las llamadas que se hacen desde clienteAxios tengan de base la  url del backend con /api
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios;