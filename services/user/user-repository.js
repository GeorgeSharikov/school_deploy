import {UserModel} from "../../db/models/models.js";
import {ApiError} from "../../error/ApiError.js";
import bcrypt from "bcrypt";

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
    static async getAllUsers(next){
        try{
            return await UserModel.findAll({where: {role: 'USER'}})
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    static async resetUserPassword(id,next){
        try{
            const hashPassword = await bcrypt.hash('1234567', 5)
            await UserModel.update(
                {password: hashPassword},
                {where: {id}}
                )
            return 200
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    static async changeStatus(status,id,next){
        try{
            await UserModel.update(
                {status: status},
                {where: {id}}
            )
            return status
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }
    static async changePassword(password,id,next){
        try{
            await UserModel.update(
                {password: password},
                {where: {id}}
            )
            return 200
        }catch (e) {
            console.log(e)
            return next(ApiError.internal('Неизвестная ошибка'))
        }
    }
}