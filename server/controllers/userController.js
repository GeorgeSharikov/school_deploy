import {UserService} from "../services/user/user-service.js";
import {generateJWT} from "../core/helpers/generateJWT.js";



class User{
    async registration(req, res, next){
        const userData = req.body
        const token = await UserService.registration(userData, next)
        if(token) {
            res.json({token})
        }
    }

    async logIn(req, res, next){
        const userData = req.body
        const token = await UserService.signIn(userData, next)
        if(token) {
            res.json({token})
        }
    }

    async auth(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }

    async registrationAdmin(req, res, next){
        const userData = {
            email: 'admin@gmail.com',
            password: '123456789',
            firstName: 'Наталья',
            lastName: 'Усова',
            role: 'ADMIN',
        }
        const token = await UserService.registrationAdmin(userData, next)
        if(token) {
            res.json({token})
        }
    }
}

export const UserController = new User()