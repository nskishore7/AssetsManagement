import {model, Schema} from "mongoose"

const asignedAssetSchema = new Schema({
    assetItem:{type:Schema.Types.ObjectId,ref:"AssetItem",required:true},
    assignedTo:{type:Schema.Types.ObjectId,ref:"Users",required:true},
    assignedBy:{type:Schema.Types.ObjectId,ref:"Users",required:true},
    assigneDate:{type:Date,default:Date.now},
    returDate:{type:Date},
    conditionOnReturn:{type:String,enum:["new","good","fair","poor"]},
    notes:{type:String},
    status:{type:String,enum:["pending","approved","rejected","returned"],
    default:"pending"}
},{timestamps:true});


const AssignedAsset = model("AssignedAsset",asignedAssetSchema);

export default AssignedAsset;