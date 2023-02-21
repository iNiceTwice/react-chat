import express from "express";
import { verifyToken } from "../controllers/auth.controller"

const router = express.Router()

router.get("/auth", verifyToken)



export default router 