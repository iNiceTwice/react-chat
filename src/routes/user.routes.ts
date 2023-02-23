import express from "express";
import { registerUser, getUsers, loginUser } from "../controllers/user.controller"
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)    

router.get("/", getUsers)



export default router 