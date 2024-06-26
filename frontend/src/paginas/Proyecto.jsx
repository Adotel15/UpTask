import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useProyecto from '../hooks/useProyecto';

import Alerta from '../components/Alerta';
import Tarea from '../components/Tarea';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';

const Proyecto = () => {
    const par = useParams();

    const { cargando, handleModalTarea, obtenerProyecto, alerta, proyecto } =
        useProyecto();

    const { nombre } = proyecto;

    useEffect(() => {
        obtenerProyecto(par.id);
    }, []);

    if (cargando) return;
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-500 rounded"></div>
                </div>
            </div>
        </div>
    </div>;

    const { msg } = alerta;

    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-black text-4xl"> {nombre} </h1>
                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                    </svg>

                    <Link
                        to={`/proyectos/editar/${par.id}`}
                        className="uppercase font-bold"
                    >
                        Editar
                    </Link>
                </div>
            </div>

            <button
                type="button"
                className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-10 flex gap-2 items-center justify-center hover:bg-sky-500 transition-all duration-300"
                onClick={handleModalTarea}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>
                Nueva Tarea
            </button>

            <p className="font-bold text-xl my-10">Tareas del Proyecto</p>

            {msg && (
                <div className="flex justify-center">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <Alerta alerta={alerta} />
                    </div>
                </div>
            )}

            <div className="bg-white shadow mt-10 rounded-lg">
                {proyecto.tareas?.length ? (
                    proyecto.tareas?.map((tarea) => (
                        <Tarea key={tarea._id} tarea={tarea} />
                    ))
                ) : (
                    <p className="text-center my-5 p-10">
                        {' '}
                        No hay tareas en este proyecto{' '}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between mt-10">
                <p className="font-bold text-xl"> Colaboradores </p>

                <Link
                    to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                    className="uppercase font-bold text-sky-400 hover:text-sky-500"
                >
                    Añadir
                </Link>
            </div>

            <ModalFormularioTarea />
            <ModalEliminarTarea />
        </>
    );
};

export default Proyecto;
