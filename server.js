import { config } from 'dotenv';
import express from 'express';
import path from 'path';

import { __dirname } from './util/__dirname.js ';
import userRoutes from './routes/userRoutes.js';
import { connectDatabase } from './config/database.js';

config();
//Conexión a la base de datos
connectDatabase()
.then(() => {
  console.log('Conectado a la base de datos');
}).catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
  process.exit(1);
});

//Configurar el servidor
const server = express();
const PORT = process.env.PORT || 3000;
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

//COnfiguraciòn Motor de plantillas

server.set('views engine', 'ejs');
server.set('views', path.join(__dirname, 'views')); 
console.log("motor plantillas "+path.join(__dirname));

//Rutas
server.use(userRoutes);

//Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

