import express from "express";
import { verifyToken } from "../controllers/authController"

const router = express.Router()

router.get("/auth", verifyToken)



export default router 