import express from "express";
import { getMessages, saveMessage, setReadedMessages } from "../controllers/message.controller"
import { verifyToken } from "../controllers/auth.controller";

const router = express.Router()

router.get("/messages", verifyToken, getMessages)
router.post("/message", verifyToken, saveMessage)
router.put("/messages", verifyToken, setReadedMessages)


export default router 