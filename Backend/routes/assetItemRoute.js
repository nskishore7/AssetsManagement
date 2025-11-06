import express from "express"
import { verifyUser } from "../middlwares/verifyUser.js"
import checkRole from "../middlwares/checkRole.js"
import { addAssetItem, editAssetItem } from "../controllers/assetItemController.js"

const assetItemRouter = express.Router()


// add assetitem
assetItemRouter.post('/add',verifyUser,checkRole(["super admin","admin"]),addAssetItem)

//edit assetitem
assetItemRouter.put('/edit',verifyUser,checkRole(["super admin","admin"]),editAssetItem)

//delete assetitem
assetItemRouter.delete("/delete",verifyUser,checkRole(["super admin","admin"]),)

export default assetItemRouter;