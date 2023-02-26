import express from "express";
import { getMessages, saveMessage } from "../controllers/message.controller"
import { verifyToken } from "../controllers/auth.controller";

const router = express.Router()

router.post("/message", verifyToken, saveMessage)
router.get("/messages", verifyToken, getMessages)

export default router 