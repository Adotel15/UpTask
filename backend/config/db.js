
// moongose es una dependencia, y un ORM para hacer la comunicación
// con nuestra base de datos más sencilla

import mongoose from "mongoose";

const conectarDB = async () => {

    try {

        // Instancia para conectar a través de mongoose
        const connection = await mongoose.connect(
            process.env.MONGO_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const url = `${connection.connection.host}:${connection.connection.port}`

        console.log(`MongoDB Conectado a: ${url}`)

    } catch (error) {

        console.log(`error: ${error.message}`);
        // process.exit es un comando de node para finalizar la ejecución en seco,
        //  normalmente se termina en 0, le pasamos 1 para saber que ha sido aquí el error
        process.exit(1);

    }
}

export default conectarDB;