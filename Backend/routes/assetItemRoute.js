import express from "express"
import { verifyUser } from "../middlwares/verifyUser.js"
import checkRole from "../middlwares/checkRole.js"
import { addAssetItem } from "../controllers/assetItemController.js"

const assetItemRouter = express.Router()

assetItemRouter.post('/add',verifyUser,checkRole(["super admin","admin"]),addAssetItem)


export default assetItemRouter;