import { User } from "../models/user.model.js";
import { asyncHandler } from "./asyncHandler.middleware.js";
import error from "./error.middleware.js";
import jwt from "jsonwebtoken"
export const isAdminAuthenticated =asyncHandler(async(req,res,next)=>{
    const token =req.cookies.adminToken
    if(!token)
      return next (new error("Admin not authenticated!!",400))
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !=="Admin"){
       return next(new error(`${req.user.role} not authorized for this resources`,403))
    }
    next();
})

export const isPatientAuthenticated =asyncHandler(async(req,res,next)=>{
    const token =req.cookies.patientToken
    if(!token)
      return next (new error("Patient not authenticated!!",400))
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decoded.id)
    if(req.user.role !=="Patient"){
       return next(new error(`${req.user.role} not authorized for this resources`,403))
    }
    next();
})
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};