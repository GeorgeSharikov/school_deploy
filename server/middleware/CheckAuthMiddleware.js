import jwt from 'jsonwebtoken'
import env from 'dotenv';env.config()

export const CheckAuth = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Не авторизован'})
        }
        req.user = jwt.verify(token, process.env["SECRET_KEY"])
        next()
    }catch(e){
        res.status(401).json({message:'Не авторизован'})
    }
}

export const CheckAccess = (role) => (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message:'Не авторизован'})
        }
        const userInfo = jwt.verify(token, process.env["SECRET_KEY"])
        if(userInfo['role'] !== 'ADMIN'){
            return res.status(403).json({message:'Отказано в доступе'})
        }
        req.user = jwt.verify(token, process.env["SECRET_KEY"])
        next()
    }catch(e){
        console.log(e)
        // res.status(401).json({message:'Не авторизован'})
    }
}