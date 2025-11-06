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


export const deleteAssetModel = async (req, res) => {
    try {
        let { id } = req.query  //get the id from req query ?id=
        let response = await AssetModel.findByIdAndDelete(id)
        if (response) {
            return res.status(200).json({ message: "Asset Model Deleted" })
        } else {
            return res.status(400).json({ message: "Asset Model Not Found" })
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
