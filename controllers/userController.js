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

    async getAllUsers(req, res, next){
        const users = await UserService.getAllUsers( next)
        res.json(users)
    }
    async resetUserPassword(req, res, next){
        const id = req.query.id
        const code = await UserService.resetUserPassword(id, next)
        res.json({code})
    }

    async changeStatus(req, res, next){
        const {status} = req.body
        const id = req.user.id

        const statusData = await UserService.changeStatus(status,id, next)
        res.send({statusData})
    }

    async changePassword(req, res, next){
        const {password} = req.body
        const id = req.user.id
        console.log(password)
        const statusData = await UserService.changePassword(password,id, next)
        res.send({statusData})
    }
}

export const UserController = new User()