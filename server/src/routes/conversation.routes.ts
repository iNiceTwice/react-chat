import express from "express";
import { verifyToken } from "../controllers/auth.controller";
import { addConversation, getConversation } from "../controllers/conversation.controller"

const router = express.Router()

router.post("/conversation",verifyToken , addConversation)

router.get("/conversation",verifyToken , getConversation)

export default router 