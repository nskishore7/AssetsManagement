import AssetItem from "../models/AssetItem.js";
import AssetModel from "../models/AssetModel.js";

export const addAsset = async (req, res) => {

    try {
        if (req.body) {
            let isExists = await AssetModel.findOne({ name: req.body.name })
            if (isExists) {
                return res.status(400).send({ message: "AssetModel Already Exists" })
            } else {
                await AssetModel.create(req.body)
                return res.status(201).send({ message: "AssetModel Created" })
            }
        } else {
            return res.status(400).send({ message: "Body cannot be empty" })
        }

    } catch (error) {
        return res.status(500).send({ message: "server side error", error: error.message })
    }



}



export const editAssetModel = async (req, res) => {
    try {

        if (req.body) {
            let { id } = req.params //get the id from req params
            let response = await AssetModel.findByIdAndUpdate(id, { $set: { ...req.body } })
            if (response) {
                return res.status(200).json({ message: "Asset Model Updated" });
            } else {
                return res.status(400).json({ message: "Asset Model Not Found" });
            }

        } else {
            return res.status(400).json({ error: "Body can not be empty" });
        }


    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteAssetModel = async (req,res) => {
    try {
        let { id } = req.query  //get the id from req query ?id=123456789
        let isModel = await AssetModel.findById(id)
        if (isModel) {

            let isItems = await AssetItem.find({model: id})
            if (isItems) {
                return res.status(400).json({ message: "can't delete the model used for items" })
            }else{
                 await AssetModel.findByIdAndDelete(id)
            return res.status(200).json({ message: "Assetmodel deleted" })
            }
           
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getAssetModel = async (req, res) => {
    try {
        const response = await AssetModel.find()

        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: error.message })
    }
}


export const getAssetModelsWithItems = async (req, res) => {
    try {

        let allModelsWithItems = await AssetModel.aggregate([{
            $lookup: {
                localField: "_id",
                from: "assetitems",
                foreignField: 'model',
                as: "items",
            }
        }])
        res.status(200).send(allModelsWithItems)

    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: error.message })
    }
}


