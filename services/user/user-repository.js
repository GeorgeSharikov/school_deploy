import {UserModel} from "../../db/models/models.js";
import {ApiError} from "../../error/ApiError.js";

export class UserRepository{
    static async checkUserInDB(email, next){
        try{
            const isUserExist = await UserModel.findOne({where: {email}})
            return !!isUserExist
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    static async checkAdminInDB(next){
        try{
            const isUserExist = await UserModel.findOne({where: {role: 'ADMIN'}})
            return !!isUserExist
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    static async createUser({email, password, firstName, lastName, role = 'USER'}, next){
        try{
            return await UserModel.create({email, password, firstName, lastName, role})
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }

    static async getUser(email, next){
        try{
            return await UserModel.findOne({where: {email}})
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }
}