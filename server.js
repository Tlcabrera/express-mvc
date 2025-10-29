import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { __dirname } from './util/__dirname.js';
import userRoutes from './routes/userRoutes.js';
config();
//Conexión a la base de datos

//Configurar el servidor
const server = express();
const PORT = process.env.PORT ;
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

//Rutas
server.use(userRoutes);

//Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

