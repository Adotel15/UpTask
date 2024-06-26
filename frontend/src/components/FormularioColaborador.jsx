import { useState } from 'react';
import useProyecto from '../hooks/useProyecto';
import Alerta from './Alerta';

const FormularioColaborador = () => {
    const [email, setEmail] = useState('');

    const { mostrarAlerta, alerta, submitColaborador, setAlerta } =
        useProyecto();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            mostrarAlerta({
                msg: 'El email es obligatorio',
                error: true,
            });
            return;
        }

        setAlerta({});
        submitColaborador(email);
    };

    const { msg } = alerta;

    return (
        <form
            className="bg-white py-10 px-5 md:w_1/2 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    className="text-gray-700 text-sm font-bold uppercase"
                    htmlFor="email"
                >
                    Email del Colaborador(a)
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Email colaborador(a)"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg text-sm mt-5"
                    value="Añadir Colaborador(a)"
                />
            </div>
        </form>
    );
};

export default FormularioColaborador;
