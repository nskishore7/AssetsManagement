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
        if(!req.body) return res.status(400).json({ message: "required req.body" });
        const { id, ...updateData } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Asset Item ID required" });
        }

        const updatedAssetItem = await AssetItem.findByIdAndUpdate(id, updateData);

        if (!updatedAssetItem) {
            return res.status(404).json({ message: "Asset item not found" });
        }

        return res.status(200).json({ message: "Updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteAssetItem = async(req,res)=>{
    try {
         if(!req.body) return res.status(400).json({ message: "required req.body" });
        const { id } = req.body;

        if (id) {
            let asset = await AssetItem.findById(id)

            if (asset) {

                await AssetItem.findByIdAndDelete(id)
                return res.status(200).send({ message: "asset item deleted successfully" });
            } else {
                return res.status(400).send({ message: "Asset is not exists" });
            }
        } else {
            return res.status(400).send({ message: "provide Asset item id" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}