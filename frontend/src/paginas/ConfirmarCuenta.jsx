import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
    const [alerta, setAlerta] = useState('');
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    const Params = useParams();
    const { id } = Params;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/usuarios/confirmar/${id}`;
                const { data } = await clienteAxios.get(url);

                setAlerta({
                    msg: data.msg,
                    error: false,
                });

                setCuentaConfirmada(true);
            } catch (error) {
                console.log(error);
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
            }
        };

        return () => confirmarCuenta();
    }, []);

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-sky-600 font-black text-5xl">
                Confirma Tu Cuenta y Entra a
                <span className="text-slate-700"> UpTask </span>
            </h1>

            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}

                {cuentaConfirmada && (
                    <Link
                        className="block text-center my-5 text-slate-500 uppercase text-sm"
                        to="/"
                    >
                        Inicia Sesión
                    </Link>
                )}
            </div>
        </>
    );
};

export default ConfirmarCuenta;
