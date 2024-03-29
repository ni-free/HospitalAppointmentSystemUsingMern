import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import error from "../middleware/error.middleware.js";
import { User } from "../models/user.model.js";
import { Appointment } from "../models/appointment.model.js";

export const postAppointment = asyncHandler(async (req, res, next) => {
    const { firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointmentDate,
        department,
        doctor_firstname,
        doctor_lastname,
        hasVisited,
        
        Address
    } =  req.body;
    if(!(firstName &&
        lastName &&
        email &&
        phone &&
        dob &&
        gender &&
        appointmentDate &&
        department &&
        doctor_firstname &&
        doctor_lastname &&
        
        
        Address))

        return next(new error("all fields are required"))

        const isConflict = await User.find({
            firstName:doctor_firstname,
            lastName :doctor_lastname,
            role:"Doctor",
            doctordepartment:department
        })
        if(isConflict.length===0)
            return next(new error("Doctor not found",404))
        if(isConflict.length>1)
            return next(new error("Doctor conflict contact through mail",404))
        const doctorId =isConflict[0]._id
        const patientId = req.user._id
        const appointment = await Appointment.create({
            firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointmentDate,
        department,
       doctor:{  firstName: doctor_firstname,
      lastName: doctor_lastname},
        hasVisited,
        doctorId,
        patientId,

        Address
        })
        res.status(200).json({
            success:true,
            message:"Appointment sent successfully.."
        })
})