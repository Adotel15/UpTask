import FormularioColaborador from '../components/FormularioColaborador';

import useProyecto from '../hooks/useProyecto';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

const NuevoColaborador = () => {
    const { obtenerProyecto, proyecto, cargando } = useProyecto();
    const params = useParams();

    useEffect(() => {
        obtenerProyecto(params.id);
    }, []);

    if (cargando) return <h1 className="text-4xl font-black">Cargando...</h1>;

    return (
        <>
            <h1 className="text-4xl font-black">
                Añadir Colaborador(a) al Proyecto: {proyecto.nombre}
            </h1>

            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>
        </>
    );
};

export default NuevoColaborador;
