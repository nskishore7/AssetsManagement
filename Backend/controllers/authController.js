
import User from "../models/User.js";
import { comparepass } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";


export async function loginUser(req, res) {
    try {

        const { email, password } = req.body;
        if (email && password) {
            const isUser = await User.findOne({ email })
            if (isUser) {
                const isMatch = comparepass(password, isUser.password)
                if (isMatch) {
                    const token = generateToken({ id: isUser._id })
                    res.cookie("token", token) // client browser
                    return res.status(200).send({ success: true, message: "Login Successfully" })
                } else {
                    return res.status(401).send({ success: false, message: "wrong password" })
                }

            } else {
                return res.status(404).send({ success: false, message: "User not found" })
            }
        }
        else {
            return res.status(400).send({ success: false, message: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "server side error", error: error.message })
    }
}


export const authStatus = async (req, res) => {
    try {
        const { user } = req

        return res.status(200).send(
            {
                role: user.role,
                name: user.name,
                email: user.email,
                department: user.department,
                status: user.status,
                mobile: user.mobile,
                designation: user.designation
            }
        )

    } catch (error) {
        return res.status(500).send({
            message: "something went wrong",
            error: error.message
        })
    }
}