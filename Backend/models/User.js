import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type :String,required:true},
    email:{type :String,required:true,unique:true},
    password:{type :String,required:true},
    mobile:{type :String,required:true,unique:true},
    role:{
        type:String,
        enum:["admin","employee","super admin"],
        default:"employee"
    },
    department : {type:String},
    designation : {type:String},
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
},{timestamps:true})  // this timestamps will create 2 default field (create,updated)


const User = mongoose.model("users",userSchema)

export default User;