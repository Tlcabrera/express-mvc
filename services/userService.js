import { userModel } from "../models/userModel.js"

export const getUsers = async () => {
    const users = await userModel.find()
    return users;
}

export const getUser = async (id) => {
    const user = await userModel.findOne({ "_id": id });
    return user;

}

export const createUser = async (user) => {
    const userCreated = await userModel.create(user);
    return userCreated;
}


export const updateUser = async (id, user) => {
    const userUpdated = await userModel.updateOne({ _id: id }, { $set: user });
    return userUpdated;
}

export const deleteUser = async (id, user) => {
    const userDeleted = await userModel.deleteOne({ _id: id });
    return userDeleted;
}