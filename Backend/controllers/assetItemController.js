import AssetItem from "../models/AssetItem.js"



export const addAssetItem =  async(req,res)=>{
    try {
        if(req.body){
            const isExists = await AssetItem.findOne({serialNumber:req.body.serialNumber})
            if(!isExists){
                await AssetItem.create(req.body)
                return res.status(201).send({message:"Asset Created"})
            }else{
                 return res.status(400).send({message:"Asset Already Exists"})
            }
        }
    } catch (error) {
         return res.status(500).send({message:"something went wrong",error:error.message})
    }
}