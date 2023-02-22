import express from "express";
import { registerUser, getUsers, loginUser, addContact, getContacts } from "../controllers/user.controller"
const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)    

router.put("/addContact", addContact)

router.get("/getContacts", getContacts)    

router.get("/", getUsers)



export default router 