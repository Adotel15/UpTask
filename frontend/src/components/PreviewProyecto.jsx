import { Link } from 'react-router-dom';

const PreviewProyecto = ({ proyecto }) => {
    const { nombre, _id, cliente } = proyecto;

    return (
        <div className="border-b p-5 flex">
            <p className="flex-1 font-bold">
                {nombre}
                <span className="text-xs text-gray-400 uppercase">
                    {'  *  '}
                    {cliente}
                </span>
            </p>

            <Link
                className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
                to={`${_id}`}
            >
                Ver Proyecto
            </Link>
        </div>
    );
};

export default PreviewProyecto;
