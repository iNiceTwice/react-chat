import express from "express";
import { registerUser, getUsers } from "../controllers/userController"
const router = express.Router()

router.post("/", registerUser)

router.get("/", getUsers)



export default router