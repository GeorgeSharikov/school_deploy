import {Router} from 'express'
import { userInfoRouter } from './userInfoRoutes.js';
import {userRouter} from "./userRoutes.js";
import {uploadFileRouter} from "./uploadFileRouter.js";
import {articleRouter} from "./articleRouter.js";

const router = new Router()

router.use('/user', userRouter)
router.use('/userInfo', userInfoRouter)
router.use('/static', uploadFileRouter)
router.use('/article', articleRouter)

export const mainRouter = router