import jwt from "jsonwebtoken";

export const generateJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '14d'})
}