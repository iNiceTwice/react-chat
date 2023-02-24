import express from "express";
import { verifyToken } from "../controllers/auth.controller";
import { addConversation, getConversation } from "../controllers/conversation.controller"
import CONVERSATIONS from "../models/conversation.model"
const router = express.Router()

router.post("/add/conversation",verifyToken , addConversation)

router.get("/get/conversation",verifyToken , getConversation)

router.get("/get/conversations", async (req, res) => {
    const conversations = await CONVERSATIONS.find()
    res.send(conversations)
})



export default router 