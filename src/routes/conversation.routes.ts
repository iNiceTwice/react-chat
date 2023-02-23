import express from "express";
import { addConversation, getConversations } from "../controllers/conversation.controller"
const router = express.Router()

router.post("/add/conversations", registerUser)

router.get("/get/conversations", getUsers)



export default router 