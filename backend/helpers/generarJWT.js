
import jwt from "jsonwebtoken"

const generarJWT = (id) => {
    // Para crear un token, usamos .sign ({id}, Firma Secreta en ENV, y {Cuando Caduca})
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

export default generarJWT;