import jwt from "jsonwebtoken"

const securityKey = "project1"


export const generateToken = (payload,optional)=>{
    return jwt.sign(payload,securityKey,optional)
}


export const verifyToken = (token)=>{
    return jwt.verify(token,securityKey)
}