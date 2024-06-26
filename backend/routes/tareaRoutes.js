import Express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
} from '../controllers/tareaController.js';

const router = Express.Router();

router.post('/', checkAuth, agregarTarea);

router
    .route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea);

router.post('/estado/:id', checkAuth, cambiarEstado);

export default router;
