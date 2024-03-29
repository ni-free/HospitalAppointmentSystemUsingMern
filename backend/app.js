import express from "express";
import {config} from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from  "./router/message.router.js"
import { ApiError } from "./middleware/error.middleware.js";
import  userRouter  from "./router/user.router.js"
import  appointmentRouter from "./router/appointment.router.js"

const app = express()
config({path: "./config/config.env"})

app.use(cors({
   origin :[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
   methods: ["GET" , "POST" ,"PUT" ,"DELETE"],
   credentials: true,
}))

app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
   fileUpload({
     useTempFiles: true,
     tempFileDir: "/tmp/",
   })
 );

app.use("/api/v1/message",messageRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/appointment",appointmentRouter)

app.use(ApiError)

dbConnection()

export default app