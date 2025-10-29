//Definir rutas y conectarlas con el controller

import { Router } from 'express';
import { deleteUser, edithViewUser, formUserView, indexView,saveUser,updatedUser } from '../controllers/userController.js';

const router = Router();

//Rutas para usuarios siguiendo el patrón RESTful peticiones http

router.get('/', indexView);
router.get('/form/usuarios', formUserView);
router.post('/save/usuarios', saveUser);
router.get('/form/usuarios/:id', edithViewUser);
router.post('/update/usuarios/:id', updateUser);
router.post('/delete/usuarios/:id', deleteUser);

export default router;