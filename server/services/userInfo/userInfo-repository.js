import {ApiError} from "../../error/ApiError.js";
import env from 'dotenv';env.config()
import { UserModel } from "../../db/models/models.js";


export class UserinfoRepository{
    static async getUserData(id, next){
        try{
            const userInfo = await UserModel.findOne({where: {id}})
            const {email, firstName, status, lastName,avatar,bookmarks,userArticles} = userInfo.toJSON()
            return {email, firstName, lastName, status, avatar,bookmarks,userArticles}
        }catch(e){
            console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
        }
    }
}

