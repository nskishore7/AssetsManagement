import express from "express"
import { verifyUser } from "../middlwares/verifyUser.js"
import checkRole from "../middlwares/checkRole.js"
import { addAssetItem, deleteAssetItem, editAssetItem, getAssetItem } from "../controllers/assetItemController.js"

const assetItemRouter = express.Router()


// add assetitem
assetItemRouter.post('/add',verifyUser,checkRole(["super admin","admin"]),addAssetItem)

//edit assetitem
assetItemRouter.put('/edit/:id',verifyUser,checkRole(["super admin","admin"]),editAssetItem)

//delete assetitem
assetItemRouter.delete("/delete",verifyUser,checkRole(["super admin","admin"]),deleteAssetItem)

// get all Asset Item
assetItemRouter.get('/all',verifyUser,getAssetItem)

export default assetItemRouter;