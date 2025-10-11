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