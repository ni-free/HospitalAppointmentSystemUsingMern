import express  from "express";
import { deleteAppointmentStatus, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointment.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.middleware.js";

const router =express.Router()

router.post("/post",isPatientAuthenticated,postAppointment)
router.get("/getdetail",isAdminAuthenticated,getAllAppointments)
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointmentStatus)
export default router