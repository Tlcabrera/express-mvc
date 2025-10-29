//traer la base de datos
import { userModel } from '../models/userModel.js';
//crear los servicios para los usuarios

//servicio para obtener todos los usuarios
export const getUsers = async () => {
    //lógica para obtener todos los usuarios
    return users;
};
//servicio para obtener un usuario por id
export const getUser = async (id) => {
    //lógica para obtener un usuario por id
    return user;
};

//servicio para crear un nuevo usuario
export const createUser = async (user) => {
    //lógica para crear un nuevo usuario
    return newUser;
};

//servicio para actualizar un usuario por id
export const updateUser = async (id, user) => {
    //lógica para actualizar un usuario por id
    return userUpdated;
};

//servicio para actualizar un usuario por id
export const deleteUser = async (id) => {
    //lógica para eliminar un usuario por id
    return userDeleted;
};




