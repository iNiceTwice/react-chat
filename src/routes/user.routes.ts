import express from "express";
import { registerUser, getUsers, loginUser, logoutUser } from "../controllers/user.controller"
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)    

router.get("/logout", logoutUser)

router.get("/", getUsers)



export default router 