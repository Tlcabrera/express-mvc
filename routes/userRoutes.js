import { Router } from "express";
import { deletedUser, edithViewUser, formUserView, indexView, saveUser, updatedUser } from "../controllers/userController.js";

const router = Router()

router.get('/', indexView)
router.get('/form/usuarios', formUserView)
router.post('/save/usuarios', saveUser)
router.get('/form/usuarios/:id', edithViewUser)
router.post('/update/usuarios/:id', updatedUser)
router.post('/delete/usuarios/:id', deletedUser)

export default router;