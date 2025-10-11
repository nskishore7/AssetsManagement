import express from "express"
import { addUser,changePassword,updateUser} from "../controllers/userController.js";
import { verifyUser } from "../middlwares/verifyUser.js";




const userRouter = express.Router()

// userRouter.get('/',(req,res)=> res.send({message:"user router is working"}))

// add
userRouter.post('/add',addUser)


// userRouter.put('/update',auth,updateUser) ----- my update creation

// update
userRouter.put('/update',verifyUser,updateUser)

// update password (using current password)
userRouter.patch('/changepass',verifyUser,changePassword)

export default userRouter;