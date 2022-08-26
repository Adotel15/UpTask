
import Express from 'express'
import { registrar } from '../controllers/usuarioController.js';

// Router propio de express
const router = Express.Router();

// Este será el estándar cada vez que haya un get desde la app, se ejectuará este get()
// router.get("/", usuario)
// router.post("/", crearUsuario)

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo Usuario


export default router;


/*
// Routing
// El app en express tiene acesso a .get .post .delete .use(Es el general)
// app./lo que sea/(/ENDPOINT O RUTA/, /CALLBACK FUNCTION/)
app.use('/api/usuarios', (req, res) => {
    // .send envia datos a la pantalla
    // res.json({ prueba: "Prueba" }) => Crea una API
    res.send('Hola mundo del diablo')
})

*/