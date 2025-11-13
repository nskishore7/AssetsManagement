import express from "express"
import { verifyUser } from "../middlwares/verifyUser.js";
import { addAsset, deleteAssetModel, editAssetModel, getAssetModel, getAssetModelsWithItems } from "../controllers/assetModelController.js";
import checkRole from "../middlwares/checkRole.js";



const assetModelRouter = express.Router()

assetModelRouter.get('/',(req,res)=> res.send({message:"asset router is working"})) //demo


// add assetmodel
assetModelRouter.post('/add',verifyUser,checkRole(["super admin","admin"]),addAsset)

//edit assetmodel
assetModelRouter.put('/edit/:id',verifyUser,checkRole(["super admin","admin"]),editAssetModel)

//delete assetmodel
assetModelRouter.delete('/delete',verifyUser,checkRole(["super admin","admin"]),deleteAssetModel)

// get all assetModel
assetModelRouter.get("/all",verifyUser,getAssetModel)

// get all with items
assetModelRouter.get('/all/items',verifyUser,getAssetModelsWithItems)

export default assetModelRouter;