
import Express from 'express'
import { 
    registrar, 
    autenticar, 
    confirmar, 
    olvidePassword, 
    comprobarToken,
    nuevoPassword,
    perfil
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

// Router propio de express
const router = Express.Router();

// Este será el estándar cada vez que haya un get desde la app, se ejectuará este get()
// router.get("/", usuario)
// router.post("/", crearUsuario)

// Autenticación, Registro y Confirmación de Usuarios
router.post("/", registrar); // Crea un nuevo Usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar); // :token crea routing dinámico
router.post("/olvide-password", olvidePassword)
router.route("/olvide-password/:token")
        .get(comprobarToken)
        .post(nuevoPassword)

// Cuando entras a /perfil, primero se ejecuta el middleware checkAuth para comprobar
// si está autorizado, y luego llama a la función perfil
router.get("/perfil", checkAuth, perfil)



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