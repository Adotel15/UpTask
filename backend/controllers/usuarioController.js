
import Usuario from "../models/Usuario.js"

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
        // Se almacena con .save()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error)
    } finally {
        console.log(`Usuario creado ${req.body.nombre}`)
    } 
}

export {
    registrar
}