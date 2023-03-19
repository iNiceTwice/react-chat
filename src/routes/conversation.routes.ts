import express from "express";
import { verifyToken } from "../controllers/auth.controller";
import { addConversation, getConversation } from "../controllers/conversation.controller"
import CONVERSATIONS from "../models/conversation.model"
const router = express.Router()

router.post("/conversation",verifyToken , addConversation)

router.get("/conversation",verifyToken , getConversation)

router.get("/conversations", async (req, res) => { //DELETE
    const conversations = await CONVERSATIONS.find()
    res.send(conversations)
})
router.get("/delete", async (req, res) => { //DELETE
    console.log("delete")
    await CONVERSATIONS.findOneAndDelete({members:[req.query.sender, req.query.receiver]})
    res.status(200).send("deleted")
})



export default router 