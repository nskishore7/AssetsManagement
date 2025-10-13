import express from "express"
import { addUser,changePassword,updateUser} from "../controllers/userController.js";
import { verifyUser } from "../middlwares/verifyUser.js";
import checkRole from "../middlwares/checkRole.js";





const userRouter = express.Router()

// userRouter.get('/',(req,res)=> res.send({message:"user router is working"}))

// add
userRouter.post('/add/employee',verifyUser,checkRole(["admin","super admin"]),addUser)

userRouter.post('/add/admin',verifyUser,checkRole(["super admin"]),addUser)


// userRouter.put('/update',auth,updateUser) ----- my update creation

// update
userRouter.put('/update',verifyUser,updateUser)

// update password (using current password)
userRouter.patch('/changepass',verifyUser,changePassword)

export default userRouter;