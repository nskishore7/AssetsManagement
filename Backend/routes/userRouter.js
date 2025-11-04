import express from "express"
import { addUser,changePassword,deleteUser,editUser,getAllAdmins,getAllEmployees,updateUser} from "../controllers/userController.js";
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

//all employees
userRouter.get('/employees',verifyUser,checkRole(["admin","super admin"]),getAllEmployees)

//all admins
userRouter.get('/admins',verifyUser,checkRole(["super admin"]),getAllAdmins)

//edit employee
userRouter.put('/edit/employee',verifyUser,checkRole(["super admin","admin"]),editUser)

//edit admin
userRouter.put('/edit/admin',verifyUser,checkRole(["super admin"]),editUser)


//delete employee
userRouter.delete('/delete/employee',verifyUser,checkRole(["super admin","admin"]),deleteUser)

//delete admin
userRouter.delete('/delete/admin',verifyUser,checkRole(["super admin"]),deleteUser)

export default userRouter;