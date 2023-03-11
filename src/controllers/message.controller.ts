import { Response, Request } from "express"
import MESSAGES from "../models/message.model"

export const getMessages = async ( req:Request, res:Response ):Promise<Object> => {
    const { id } = req.query
    const messages = await MESSAGES.find({ conversationId:id })
    return res.status(200).send(messages)
}

export const saveMessage = async ( req:Request, res:Response ):Promise<Object> => {
    const newMessage = new MESSAGES(req.body)
    await newMessage.save()
    return res.status(200).send(newMessage)
}

export const setReadedMessages = async ( req:Request, res:Response ):Promise<Object> => {
    const { conversationId, sender } = req.body
    console.log("aaaaaaaaaaaaaaa")
    await MESSAGES.updateMany({ conversationId, sender, readed:false }, { $set: { readed:true } } )
    return res.status(200).json({message:"Message set as readed"})
}
