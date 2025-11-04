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
        const { id, ...updateData } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Asset Model ID required" });
        }

        const updatedAssetModel = await AssetModel.findByIdAndUpdate(id, updateData);

        if (!updatedAssetModel) {
            return res.status(404).json({ message: "Asset Model not found" });
        }

        return res.status(200).json({ message: "Updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteAssetModel = async (req, res) => {
    try {
        const { id } = req.body;

        if (id) {
            let asset = await AssetModel.findById(id)

            if (asset) {

                await AssetModel.findByIdAndDelete(id)
                return res.status(200).send({ message: "User deleted successfully" });
            } else {
                return res.status(400).send({ message: "user is not exists" });
            }
        } else {
            return res.status(400).send({ message: "provide User id" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
