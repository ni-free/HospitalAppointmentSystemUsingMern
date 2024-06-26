import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name shpuld contain at least 3 character"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name should contain at least 3 character"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide valid email"]
    },
    phone:{
        type:String,
        required:true,
        maxLength:[10,"Phone number should contain exact 10 digits"]
        
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message Must Contain At least 10 characters"]
    }
})

export const Message = mongoose.model("Message",messageSchema);