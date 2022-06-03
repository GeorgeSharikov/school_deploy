import { UserinfoService } from '../services/userInfo/userInfo-service.js'
import {ApiError} from '../error/ApiError.js'


class UserInfo{
   async getPersonalData(req, res, next){
       try{
        const id = req.user.id
        const userData = await UserinfoService.getPersonalData(id, next)
        res.json(userData)
       }catch(e){
           console.log(e)
            next(ApiError.internal('Неизвестная ошибка'))
       }
   }
   async getOtherPersonalData(req, res, next){
    try{
     const id = req.query.id
     const userData = await UserinfoService.getPersonalData(id, next)
     res.json(userData)
    }catch(e){
        console.log(e)
         next(ApiError.internal('Неизвестная ошибка'))
    }
}
}

export const UserInfoController = new UserInfo()