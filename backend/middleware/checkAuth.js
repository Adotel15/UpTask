
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';

// Next permite irnos al siguiente middleware,
// /perfil primero comprueba que el usuario está auntenticado, y después hay que llamar a next
const checkAuth = async (req, res, next) => {

    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Guardamos el Json Web Token que envia al req, a través de headers authorization con Bearer
            // Hacemos .split para dividir el "Bearer" del principio y cogemos el segundo elemento del array resultado
            token = req.headers.authorization.split(" ")[1]
            // Desencriptamos la firma de JWT con el token que no han pasado + nuestro firma secreta de .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Guardamos el usuario encontrado con req.usuario
            // Menos el password, y el confirmado, el token, creadeAt y upadtedAt
            req.usuario = await Usuario.findById(decoded.id).select(
                "-password -confirmado -token -createdAt -updatedAt -__v"
            )

            return next()

        } catch(error) {
            return res.status(404).json({
                msg: "Hubo un error"
            })
        }
    }

    if(!token) {
        const error = new Error("Token no válido")
        res.status(401).json({ msg: error.message })
    }


    next()
}

export default checkAuth;