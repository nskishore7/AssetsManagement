import express from "express"
import { verifyUser } from "../middlwares/verifyUser.js";
import { addAsset } from "../controllers/assetController.js";

const assetRouter = express.Router()

assetRouter.get('/',(req,res)=> res.send({message:"asset router is working"})) //demo

assetRouter.post('/add',verifyUser,addAsset)


export default assetRouter;