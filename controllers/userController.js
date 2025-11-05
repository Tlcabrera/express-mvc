import { createUser, deleteUser, getUser, getUsers, updateUser } from "../services/userService.js"

export const indexView = async (request, response) => {
    try {
        const users = await getUsers()
        response.render('index', { users })
    } catch (error) {

    }
}

export const formUserView = async (request, response) => {
    try {
        response.render('form')
    } catch (error) {

    }
}

export const saveUser = async (request, response) => {
    try {
        const user = request.body;
        const userCreated = await createUser(user);
        response.redirect('/')
    } catch (error) {

    }
}

export const edithViewUser = async (request, response) => {
    try {
        const { id } = request.params;

        const user = await getUser(id)
        console.log(user);
        response.render('editForm', { user })
    } catch (error) {

    }
}

export const updatedUser = async (request, response) => {
    try {
        console.log(request.params);
        
        const { id } = request.params;
        const user = request.body;
        const userUpdated = await updateUser(id, user)
        response.redirect('/')
    } catch (error) {
        console.log(error);

    }
}

export const deletedUser = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedUser = await deleteUser(id)
        response.redirect('/')
    } catch (error) {
        console.log(error);

    }
}