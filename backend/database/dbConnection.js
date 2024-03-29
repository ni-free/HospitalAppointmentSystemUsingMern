import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "hospital_management"

    }).then(()=>{
        console.log("Connected To database..");
    }).catch(err=>{
        console.log(`some error accuired while connecting to database: ${err}`)
    })
}