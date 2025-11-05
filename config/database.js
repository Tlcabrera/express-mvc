import { connect } from 'mongoose';
import { config } from 'dotenv';

config()
console.log('Variables de entorno cargadas:', {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_DB: process.env.MONGO_DB,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT
});
export const connectDatabase = async () => {
    console.log('Conectando a la base de datos...');
    
    console.log(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
    try {
        const conection=await connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
        console.log('Base de datos conectada:', conection.connection.name)
    return conection;
    } catch (error) {
        throw Error("Error: "+error.message);
    }
}   