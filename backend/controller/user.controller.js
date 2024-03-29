import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import bcrypt from "bcrypt"
import  error from "../middleware/error.middleware.js"; 
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.js"
import cloudinary from 'cloudinary'


export const patientRegister = asyncHandler(async(req,res,next)=>{
    const {firstName ,lastName,email,password,gender,dob,role,phone} =req.body
    if(!(firstName && lastName && email && password && gender && dob  && phone))
    {
       
        return next(new error("All fields  are required!!!",400))
    }
    let user = await User.findOne({email})
    if(user){
        return next(new error("User already exist",400))
    }
    user = await User.create({firstName,lastName,email,password,gender,dob,role:"patient",phone})
   generateToken(user,"User Registered",200,res)
    
})

export const login = asyncHandler(async function(req,res,next){
    let {email ,password ,confirmPassword,role} = req.body
    if(!(email && password && confirmPassword && role))
    {
        
        return next(new error("All fields  are required!!!",400))
    }
    if(password !== confirmPassword){
     return next(new error("password and confirm password is not same!!!",400))}
    const user = await User.findOne({email}).select('+password')
    
    if(!user){
       
    return next(new error("Invalid password or Email",400))}

    const isPasswordMatch = await user.comparePassword(password)
     if(!isPasswordMatch){
        console.log(user);
     return next(new error("Invalid password or Email",400))
     }

    if(role !== user.role)
    return next(new error("User with this role not found",400))

    generateToken(user,"User Logged in Successfully",201,res)
}) 

export const adminRegister = asyncHandler(async(req,res,next)=>{
    const {firstName ,lastName,email,password,gender,dob,phone} =req.body
    if(!(firstName && lastName && email && password && gender && dob && phone))
    {
       
        return next(new error("All fields  are required!!!",400))
    }
    let user = await User.findOne({email})
    if(user){
        return next(new error(`${user.role} with this email already exist`,400))
    }
    user = await User.create({firstName,lastName,email,password,gender,dob,phone,role:"Admin"})
   generateToken(user,"New Admin Registered",200,res)
    
})

export const getAllDoctors = asyncHandler(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"})
    res.status(200).json(
        {
            success:true,
            doctors
        }
    )
})
export const getUserDetails = asyncHandler(async(req,res,next)=>{
    const user =req.user
    res.status(200).json(
        {
            success:true,
            user
        }
    )
})

export const logoutAdmin = asyncHandler(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    .json({
        success:true,
        message: "Admin logged out successfully"
    })
})
export const logoutPatient = asyncHandler(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    })
    .json({
        success:true,
        message: "Patient logged out successfully"
    })
})

export const addNewDoctor = asyncHandler(async(req,res,next)=>{
   
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new error("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new error("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
   
    dob,
    gender,
    password,
    doctordepartment
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
   
    !dob ||
    !gender ||
    !password ||
    !   doctordepartment ||
    !docAvatar
  ) {
    return next(new error("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new error("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new error("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
   
    dob,
    gender,
    password,
    role: "Doctor",
    doctordepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
   
})


