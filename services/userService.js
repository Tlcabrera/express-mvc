//traer la base de datos
import { userModel } from '../models/userModel.js';
//crear los servicios para los usuarios

//servicio para obtener todos los usuarios
export const getUsers = async () => {
    const users= await userModel.find();
    return users;
};
//servicio para obtener un usuario por id
export const getUser = async (id) => {
    const user=  await userModel.findOne({ _id: id });
    return user;
};

//servicio para crear un nuevo usuario
export const createUser = async (user) => {
   const userCreated= await userModel.create(user);
    return userCreated;
};

//servicio para actualizar un usuario por id
export const updateUser = async (id, user) => {
    const userUpdated= await userModel.updateOne({ _id: id }, { $set: user });
    return userUpdated;
};

//servicio para eliminar un usuario por id
export const deleteUser = async (id) => {
  const userDeleted= await userModel.deleteOne({ _id: id });
    return userDeleted;
};




