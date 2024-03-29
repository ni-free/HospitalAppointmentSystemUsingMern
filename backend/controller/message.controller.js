import { Message } from "../models/message.model.js";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import error from "../middleware/error.middleware.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!(firstName && lastName && phone && message && email))
        return next(new error("All fields are required",400))
    await Message.create({ firstName, lastName, email, phone, message })

    res.status(200).json({
        success: true,
        message: "Message send Successfully"
    })
})
 
export const getAllMessages =asyncHandler(async(req,res,next)=>{
    const messages =await Message.find()
    res.status(200)
    .json({
        success:true,
        messages
    })
})