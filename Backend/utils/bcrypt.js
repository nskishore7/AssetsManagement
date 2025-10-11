import bcrypt from "bcrypt"

let saltRound = 10;
export function createHash(plainPassword){
    return  bcrypt.hashSync(plainPassword,saltRound)
}

export function comparepass(plainpassword,hashedPassword){
    return bcrypt.compareSync(plainpassword,hashedPassword)

}