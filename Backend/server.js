import express from "express"
import cors from "cors"
import { dbConnect } from "./configs/db.js"

import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"

import createSuperAdmin from "./configs/createSuperAdmin.js"
import assetModelRouter from "./routes/assettModel.js"
import assetItemRouter from "./routes/assetItemRoute.js"

const app = express()

//middlewares
app.use(express.json())   //json parser
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) // cross origin allows
app.use(cookieParser())

//routes
app.get('/', (req, res) => { res.send("demo server started") })  //demo

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use("/api/v1/asset-model", assetModelRouter)
app.use("/api/v1/asset-item", assetItemRouter)



app.listen(8080, async () => {
    console.log("server running at http://localhost:8080")

    //db connection
   await dbConnect()

   //super admin
   await createSuperAdmin()

})