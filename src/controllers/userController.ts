import { Response, Request } from "express"
import USERS from "../models/users"

export const addUser = async (req: Request, res:Response) => {
        const newUser = new USERS({
        username:"sasda",
        password:"asdasdsad",
        email:"asdasd@asdas.com",
        publicId:Math.floor(Math.random() * (9999 - 1000) + 1000)
    })
    await newUser.save()
    res.send(newUser)
}

export const getUsers = async (req: Request, res:Response) => {
    const users = await USERS.find()
    res.send(users)
}