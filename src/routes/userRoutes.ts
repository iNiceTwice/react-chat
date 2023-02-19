import express from "express";
import { registerUser, getUsers, loginUser } from "../controllers/userController"
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)    

router.get("/", getUsers)



export default router 