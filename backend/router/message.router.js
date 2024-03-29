import express from 'express'
import { getAllMessages, sendMessage } from '../controller/Message.Controller.js'
import { Message } from '../models/message.model.js'
import { isAdminAuthenticated } from '../middleware/auth.middleware.js'
const router =express.Router()

router.post('/send',sendMessage)
router.get('/getall',isAdminAuthenticated,getAllMessages)

export default router