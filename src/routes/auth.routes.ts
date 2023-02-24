import express from "express";
import { authComplete, verifyToken } from "../controllers/auth.controller"

const router = express.Router()

router.get("/auth", verifyToken, authComplete)



export default router 