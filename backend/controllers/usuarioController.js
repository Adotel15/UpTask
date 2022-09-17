
import Usuario from "../models/Usuario.js";
import generarID from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

const registrar = async (req, res) => {

    // Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({
        email
    })

    // Si existe usuario devuelvo un error
    if(existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message})
    }
    
    try{
        // Crea el nuevo Usuario a través del modelo de moongose
        const usuario = new Usuario(req.body)
        usuario.token = generarID()
        // Se almacena con .save()
        await usuario.save()
        // Enviar mail
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({ msg: "Usuario Creado Correctamente. Revisa tu email para confirmar cuenta"})

    } catch (error) {
        console.log(error)
    } finally {
        console.log(`Usuario creado ${req.body.nombre}`)
    } 
}

const autenticar = async (req, res) => {

    const { email, password } = req.body

    // Buscar si existe el usuario en Mongo
    const usuario = await Usuario.findOne({
        email
    })

    // Comprobar si el usuario existe
    if(!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }

    // Comprobar si el usario está confirmado
    if(!usuario.confirmado) {
        const error = new Error("La Cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message})
    }

    // Comprobar su password
    if(await usuario.comprobarPassword(password)) {
        res.json({
            _id : usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),

        })
    } else {
        const error = new Error("Contraseña incorrecta");
        return res.status(403).json({msg: error.message})
    }

}

const confirmar = async (req, res) => {
    // req.params => Coge la variable que hay en la url dinámico, tendrá el nombre de :variable de la url
    const { token } = req.params

    const usuarioConfirmar = await Usuario.findOne({ token })

    if(!usuarioConfirmar){
        const error = new Error("Token no válido")
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save()
        res.json({
            msg: "Usuario Confirmado Correctamente"
        })
    } catch(error) {
        console.log(error)
    }
}

const olvidePassword = async (req, res) => {

    const { email } = req.body

    const usuario = await Usuario.findOne({
        email
    })
    // Comprobar si el usuario existe
    if(!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message})
    }
     
    try {

        usuario.token = generarID()
        await usuario.save()

        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({
            msg: "Mail enviado con las instrucciones"
        })

    } catch (error){
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {

    const { token } = req.params

    const tokenValido = await Usuario.findOne({
        token
    })

    if(tokenValido){
        res.json({
            msg: "Token válido y usuario existe"
        })
    } else {
        const error = new Error("Token no válido")
        return res.status(403).json({ msg: error.message })
    }
}

const nuevoPassword = async (req, res) => {

    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({
        token
    })

    if(usuario){
        usuario.password = password
        usuario.token = ""

        try {
            await usuario.save()
            res.json({
                msg: "Contraseña Actualizada"
            })
        } catch(error) {
            console.log(error)
        }

    } else {
        const error = new Error("Token no válido")
        return res.status(404).json({ msg: error.message })
    }
}

const perfil = async (req, res) => {

    const { usuario } = req

    res.json({
        usuario
    })
}



export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}