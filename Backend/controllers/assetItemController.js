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


export const editAssetItem = async (req, res) => {
    try {

        if (req.body) {
            let { id } = req.params //get the id from req params :id
            let response = await AssetItem.findByIdAndUpdate(id, { $set: { ...req.body } })
            if (response) {
                return res.status(200).json({ message: "Asset Item Updated" });
            } else {
                return res.status(400).json({ message: "Asset Item Not Found" });
            }

        } else {
            return res.status(400).json({ error: "Body can not be empty" });
        }


    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteAssetItem = async (req, res) => {
    try {
        let { id } = req.query  //get the id from req query ?id=
        let response = await AssetItem.findByIdAndDelete(id)
        if (response) {
            return res.status(200).json({ message: "Asset Item Deleted" })
        } else {
            return res.status(400).json({ message: "Asset Item Not Found" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getAssetItem = async(req,res)=>{
    try {
        const response  = await AssetItem.find().populate("model")
            return res.status(200).send(response)
    } catch (error) {
         return res.status(500).send({message:"Something went wrong",error:error.message})
    }
}

