import AssetItem from "../models/AssetItem.js"
import AssignedAsset from "../models/AssignedAsset.js"
import User from "../models/User.js"

export const addAssignedAsset = async (req, res) => {
    try {

        if (req.body) {
            let assignedBy = req.user._id // admin/superadmin id

            console.log(assignedBy)

            const { assignedTo, assetItem } = req.body

            if (assignedTo && assetItem) { // check required
                const isItem = await AssetItem.findById(assetItem) // find the asset item
                console.log(isItem)
                if (isItem && isItem.status == "available") {
                    const isUser = await User.findById(assignedTo) //find the user
                    console.log(isUser)
                    if (isUser && isUser.status == "active") {
                        const assignedAsset = new AssignedAsset({ ...req.body, assignedBy })   // make instance
                        await assignedAsset.save() // create assigned asset
                        isItem.status = "assigned";
                        await isItem.save()  // update tthe asset item
                        return res.status(201).send({ message: "asset created" })
                    } else {
                        return res.status(400).send({ message: "user is not valid or inactive" })
                    }
                } else {
                    return res.status(400).send({ message: "asset is not presents or available" })

                }
            } else {
                return res.status(400).send({ message: "provide require fields" })
            }
        } else {
            return res.status(400).send({ message: "body can not be empty" })

        }

    } catch (error) {
        return res.status(500).send({ message: "Something went wrong",error })
    }
}



export const getAllAssignedAsset = async(req,res)=>{
    try {
        const allAssignedAsset = await AssignedAsset.find()
        .populate("assignedTo")
        .populate("assetItem")
        .populate("assignedBy")
        .populate({
            path:"assetItem",
            populate:{
                path:"model",
                model:"AssetModel"  // <-- your referenced connection name
            }
        })
        return res.status(200).send(allAssignedAsset)
    } catch (error) {
        return res.status(500).send({error:"Something Went Wrong",message:error.message})
    }
}


export const getMyAsset = async(req,res)=>{
    try {
        const id = req.user._id
        const myassets = await AssignedAsset.find({assignedTo:id})
        .populate("assetItem")
        .populate("assignedBy")
        .populate({
            path:"assetItem",
            populate:{
                path:"model",
                model:"AssetModel"
            }
        })
        return res.status(200).send(myassets)
    } catch (error) {
        return res.status(500).send({error:"Something Went Wrong",message:error.message})
    }
}