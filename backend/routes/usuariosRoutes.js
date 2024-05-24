import Express from 'express';
import {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = Express.Router();

router.post('/login', autenticar);
router.get('/perfil', checkAuth, perfil);

router.post('/', registrar);
router.get('/confirmar/:token', confirmar);

router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

export default router;
