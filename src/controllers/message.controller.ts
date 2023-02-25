import { Response, Request } from "express"
import MESSAGES from "../models/message.model"

export const getMessages = async ( req:Request, res:Response ):Promise<Object> => {
    const messages = await MESSAGES.find()
    console.log(messages)
    return res.status(200).send(messages)
}

export const saveMessage = async ( req:Request, res:Response ):Promise<Object> => {
    const newMessage = new MESSAGES(req.body)
    await newMessage.save()
    console.log(newMessage)
    return res.status(200).send(newMessage)
}
