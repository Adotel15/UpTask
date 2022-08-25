
import mongoose from "mongoose";

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

// Creamos el modelo propiamente dicho
const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario