import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b w-full h-20 flex items-center fixed">
            <div className="w-full px-7 md:flex md:justify-between">
                <h2
                    className="text-3xl text-sky-600 font-black cursor-pointer"
                    onMouseDown={() => navigate('/proyectos')}
                >
                    Uptask
                </h2>
                <input
                    type="search"
                    placeholder="Buscar Proyecto"
                    className="rounded-lg lg:w-96 block px-4 border"
                />
                <div className="flex items-center gap-5">
                    <Link
                        to="/proyectos"
                        className="font-bold uppercase hover:cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition duration-150 ease-out hover:ease-in p-1 rounded-lg"
                    >
                        Proyectos
                    </Link>

                    <button
                        type="button"
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold hover:cursor-pointer hover:bg-sky-100 hover:text-sky-600 transition duration-300 "
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
