import {Router} from "express"
import { verifyUser } from "../middlwares/verifyUser.js";
import checkRole from "../middlwares/checkRole.js";
import { addAssignedAsset, getAllAssignedAsset, getMyAsset, updateAssignedAsset } from "../controllers/assignedAssetController.js";


const assignedAssetRouter = Router();

assignedAssetRouter.get("/",(req,res)=>{
    res.send("assignedasset router is working")
})


//add
assignedAssetRouter.post('/add',verifyUser,checkRole(["admin","super admin"]),addAssignedAsset)

//get all asigned item
assignedAssetRouter.get('/all',verifyUser,checkRole(["super admin","admin"]),getAllAssignedAsset)

// get my assets
assignedAssetRouter.get("/myassets",verifyUser,getMyAsset)

//update asets
assignedAssetRouter.put("/edit/:id",verifyUser,checkRole(["admin","super admin"]),updateAssignedAsset)


export default assignedAssetRouter;