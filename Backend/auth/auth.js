
// import { verifyToken } from "../utils/jwt.js"

// export const auth = (req,res,next)=>{
//     try {
//          const {token} = req.cookies
//         if(!token){
//             return res.status(400).send({message:"token is not there"})
//         }

//        const payload =  verifyToken(token)
//        if(!payload){
//           return res.status(401).send({message:"invalid"})
//        }
//        req.payload = payload;
//         next()
//     } catch (error) {
//         return res.status(401).send({message:"something went wrong",error:error.message})
//     }
// }

