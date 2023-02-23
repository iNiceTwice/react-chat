import express from "express";
import { addConversation, getConversation } from "../controllers/conversation.controller"
import CONVERSATIONS from "../models/conversation.model"
const router = express.Router()

router.post("/add/conversation", addConversation)

router.get("/get/conversation", getConversation)

router.get("/get/conversations", async (req, res) => {
    const conversations = await CONVERSATIONS.find()
    res.send(conversations)
})



export default router 