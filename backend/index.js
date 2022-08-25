
// Va a Node Modules, busca un paquete que se llama express, y lo asigna a la variable express
// const express = require("express");
import Express from "express";
import conectarDB from "./config/db.js";
// dotenv sirve para crear variables de entorno en Express.js
import dotenv from 'dotenv'
import usuarioRoutes from "./routes/usuariosRoutes.js";

// Cada vez que se hace un cambio aquí, en el servidor no se reeabre automáticamente
// Para que si que lo haga automáticamente:
//      - npm i -D nodemon
//          -D => Esta dependencia solo estará dispo en develop, no en produccón

// Json 
//  scripts => Son los comandos para usar en la terminal, se pueden personalizar
//  dependencies => Son la dependencias del proyecto, osea los paquetes instalados
//  devDependencies => Son dependencias que solamente se usarán en develop, y no pasarán a producción
//  main => Es el archivo principal que se ve a ejecutar
//  "type": "module" => Perimite usar la sintaxis normal de javascript import/exports en vez de require('') y module.exports

// Creamos una variable app, que instancia la clase Express de "express"
const app = Express();
// Para que podamos leer e interactuar con los json que vienen desde post
app.use(Express.json())
// Esto busca un archivo llamado env en el proyecto
dotenv.config()

conectarDB()

// Routing
// El app en express tiene acesso a .get .post .delete .use(Es el general)
// app./lo que sea/(/ENDPOINT O RUTA/, /CALLBACK FUNCTION/)
// Te lleva a /api/usuarios, y ejecuta el get post delete o lo que sea de usuariosRoutes
app.use('/api/usuarios', usuarioRoutes)

// La varaible process.env.PORT se crea automáticamente en el servidor de producción, si no existe puerto 4000
const PORT = process.env.PORT || 4000

// Se ejecuta la app en el port 4000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
} )