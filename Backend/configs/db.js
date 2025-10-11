import mongoose from "mongoose"


let URL = "mongodb://localhost:27017/AssetsMangement"

export const dbConnect = async()=>{
    try {
        await mongoose.connect(URL)
        console.log("db connected successfull")
    } catch (error) {
        console.log("db connected failed",error)
    }    
}