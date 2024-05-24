import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import usuarioRoutes from './routes/usuariosRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import conectarDB from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

conectarDB();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de Cors'));
        }
    },
};

app.use(cors(corsOptions));

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
