import {createUser, getUsers, getUser, deleteUser, updateUser} from '../services/userService.js';

/*Controladores para las rutas de usuarios deleteUser, 
edithViewUser, formUserView, indexView,saveUser,updatedUser*/

export const indexView = async (req, res) => {
    try {
        const users = await getUsers();
        res.render('index', { users });
    } catch (error) {
        res.status(500).send("Error al obtener los usuarios");
    }
};

export const formUserView = (req, res) => {
    try {
        res.render('form');
    } catch (error) {
        res.status(500).send("Error al cargar el formulario de usuario");
    }
};

export const saveUser = async (req, res) => {
    try {
        const user = req.body;
        const userCreated = await createUser(user);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error al guardar el usuario");
    }
};

export const edithViewUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUser(id);
        res.render('editForm', { user });
    } catch (error) {
        res.status(500).send("Error al cargar el formulario de edición de usuario");
    }
};

export const updatedUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.body;
        const userUpdated = await updateUser(id, user);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error al actualizar el usuario");
    }
}

export const deletedUser = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedUser = await deleteUser(id)
        response.redirect('/')
    } catch (error) {
        response.status(500).send("Error al eliminar el usuario");

    }
}