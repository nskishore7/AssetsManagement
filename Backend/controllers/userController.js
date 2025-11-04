import User from "../models/User.js";
import { comparepass, createHash } from "../utils/bcrypt.js";





export async function addUser(req,res){
    try {
        const {name,email,mobile} = req.body;
        if(name && email && mobile){
            const isUser = await User.findOne({email})
            if(isUser){
                return res.status(400).send({message:"User Already Exists"})
            }else{
                const hashedPassword = createHash("password@#$")
                const userDetails = new User({...req.body,password:hashedPassword})
                await userDetails.save()
                return res.status(201).send({message:"User Created"})
            }
        }else{
            return res.status(400).send({message:"Provide All Required Fields"})
        }
    } catch (error) {
        return res.status(500).send({message:"something went wrong",error:error.message})
    }
}



// export async function updateUser(req,res){
//        try {
//         if(!req.body){
//              return res.status(400).send({message:"user not foundprovide all fields"})
//         }
//             const {name,designation} = req.body;

//            const {id} = req.payload;

//            const isUser =await User.findOne({_id:id})
//            if(!isUser){
//             return res.status(404).send({message:"user not found"})
//            }else{
//             const updateUser =await User.findOneAndUpdate({_id:id},{$set:{name:name,designation:designation}})
//              return res.status(200).send({message:"user update successfully",updateUser})
//            }
//        } catch (error) {
//             return res.status(500).send({message:"something went wrong",error:error.message})
//        }
// }


// update
export async function updateUser(req,res){
       try {
           const user = req.user   // const {user} = req  // coming from verifyUser middleware

        if(!req.body){
             return res.status(400).send({message:"no data provided"})
        }else{
            const {name,mobile} = req.body;
            user.name = name?name:user.name   
            user.mobile = mobile?mobile:user.mobile   
            await user.save()
            return res.status(200).send({message:"user data updated"})
        }
           
       } catch (error) {
            return res.status(500).send({message:"something went wrong",error:error.message})
       }
}

// update password (using current password)
export async function changePassword(req,res){
    try {

        const user = req.user // coming from verifyUser middleware

         if(!req.body){
             return res.status(400).send({message:"no data provided"})
        }else{

            const {currentpassword,newpassword} = req.body;
            if(currentpassword && newpassword){
                const isMatched = comparepass(currentpassword,user.password)
                if(isMatched){
                    //hash the new pass
                    const hashedPassword = createHash(newpassword)
                    user.password = hashedPassword; //update the user password
                    await user.save()
                    return res.status(200).send({message:"password update successfully"})
                }else{
                     return res.status(400).send({message:"incorrect password"})
                }
            }else{
                return res.status(400).send({message:"provided all fields"})
            }
        }

    } catch (error) {
         return res.status(500).send({message:"something went wrong",error:error.message})
    }
}

export const getAllEmployees = async(req,res)=>{
    try {
        const employees = await User.find({role:"employee"}).select("-password -createdAt -updatedAt -__v")

            return res.status(200).send(employees)
        
    } catch (error) {
        return res.status(500).send({message:"something went wrong",error:error.message})
    }
}

export const getAllAdmins = async(req,res)=>{
    try {
        const admins = await User.find({role:"admin"})
            return res.status(200).send(admins)
    } catch (error) {
        return res.status(500).send({message:"something went wrong",error:error.message})
    }
}



export const editUser = async(req,res)=>{
  try {
    
    const {userid} = req.headers;

    if(userid){
        let user = await User.findById(userid)

        if(user){
            
            await User.findByIdAndUpdate(userid,{$set:{...req.body}})
             return res.status(200).send({ message: "user updated successfully"});
        }else{
             return res.status(400).send({message: "user is not exists"});
        }
    }else{
        return res.status(400).send({message: "provide user id"});
    }
   
   
    } catch (error) {
          return res.status(500).send({message:"something went wrong",error:error.message})
    }
    

}



export const deleteUser = async(req,res)=>{
  try {
    
    const {userid} = req.headers;
    console.log(userid)

    if(userid){
        let user = await User.findById(userid)

        if(user){
            
            await User.findByIdAndDelete(userid)
             return res.status(200).send({ message: "User deleted successfully"});
        }else{
             return res.status(400).send({message: "user is not exists"});
        }
    }else{
        return res.status(400).send({message: "provide User id"});
    }
   
   
    } catch (error) {
          return res.status(500).send({message:"something went wrong",error:error.message})
    }
    

}

