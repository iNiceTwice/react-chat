import express from "express";
import { verifyToken } from "../controllers/auth.controller";
import { registerUser, loginUser, logoutUser, changeTheme } from "../controllers/user.controller"
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)    

router.put("/theme",verifyToken ,changeTheme)    

router.get("/logout",verifyToken ,logoutUser)

export default router 