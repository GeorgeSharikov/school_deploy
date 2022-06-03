import {ApiError} from "../../error/ApiError.js";
import env from 'dotenv';import { UserinfoRepository } from "./userInfo-repository.js";
 env.config()

export class UserinfoService{
    static async getPersonalData(id, next){
        try{
            const userData = await UserinfoRepository.getUserData(id, next)    
            return userData
        }catch(e){
             next(ApiError.internal('Неизвестная ошибка'))
        }
    }
}

