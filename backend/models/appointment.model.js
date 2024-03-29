import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    dob:{
        type:Date,
        required:[true,"Dob is required"]
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female","Other"]
    
       },

     appointmentDate:{
         type:String,
         required:true
     }  ,
     department:{
        type:String,
        required:true
    } ,
    doctor:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    } ,
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }

})

export const Appointment = mongoose.model("Appointment",appointmentSchema);