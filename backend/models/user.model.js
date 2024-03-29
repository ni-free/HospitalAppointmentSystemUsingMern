import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
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
      
        
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"]
    },
   gender:{
    type:String,
    required:true,
    enum:["Male","Female","Other"]

   },
   password:{
   type:String,
   required:true,
   select:false,
   minLength:[8,"Password Must Contain Atleast 8 chracters"]
   },
   role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"]
   },
   doctordepartment:{
    type:String
   },
   docAvatar:{
      public_id: String,
         url: String,
        
   }
})

userSchema.pre("save",async function(next){
    if(!this.password)
    {
        next()
    }
    this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

userSchema.methods.generateJWT =function(){
    
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY ,{expiresIn:process.env.JWT_EXPIRES})
}


export const User = mongoose.model("User",userSchema);