import {Router} from 'express'
import {UserController} from "../controllers/userController.js";
import {CheckAccess, CheckAuth} from "../middleware/CheckAuthMiddleware.js";

const router = new Router()

router.post('/registration', UserController.registration)
router.get('/registration-first-admin-private', UserController.registrationAdmin)
router.post('/login', UserController.logIn)
router.get('/auth', CheckAuth, UserController.auth)
router.put('/changeStatus', CheckAuth, UserController.changeStatus)
router.get('/getAllUsers', CheckAccess('ADMIN'), UserController.getAllUsers)
router.put('/resetUserPassword', CheckAccess('ADMIN'), UserController.resetUserPassword)
router.put('/changePassword', CheckAuth, UserController.changePassword)

export const userRouter = router