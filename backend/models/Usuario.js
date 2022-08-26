
import mongoose from "mongoose";
// Libreria para encriptar la contraseña
import bcrypt from "bcrypt"

// Modelo Usuario
// Esta es la manera en que se van a guardar en MongoDB
// Un Schema es la estructura de datos que crear moongose para luego insetarlo en mongo

const usuarioSchema = mongoose.Schema({
    // Creamos una variable nombre, y password
    nombre: {
        // Tiene que ser un string
        type: String,
        // Es un campo obligatorio
        require: true,
        // Si hay espacios delante o detrás los elimina
        trim: true
    },
    password: {
        // Tiene que ser un string
        type: String,
        // Es un campo obligatorio
        require: true,
        // Si hay espacios delante o detrás los elimina
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        // Tiene que ser un email único y no repetido
        unique: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false
    }

}, {
    // Crea dos columnas mas de tiempo creado, tiempo actualizado
    timestamps: true,
   }
)

// Antes de que se guarde, vamos a encriptar la contraseña
usuarioSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        // Si la contraseña se ha modificado no vamos a volver a hashearla
        // Usamos next() para que siga adelante la ejecución sin las lineas de abaajo
        next();
    }
    // Variable que "hashea 10 veces"
    const salt = await bcrypt.genSalt(10);
    // Guardamos el password hasheado
    this.password = await bcrypt.hash(this.password, salt)
})

// Para crear metódos propios del para el Schema
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    // Va a comprobar si el hash de la contraseña que está pasando el usuario es igual
    // que el que está en la base de datos
    return await bcrypt.compare(passwordFormulario, this.password)
}

// Creamos el modelo propiamente dicho
const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario