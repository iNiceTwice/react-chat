import { Response, Request } from "express"
import MESSAGES from "../models/message.model"

export const getMessages = async ( req:Request, res:Response ):Promise<Object> => {
    const { id } = req.query
    const messages = await MESSAGES.find({ conversationId:id }).sort({ createdAt: -1 })
    .limit(20);
    return res.status(200).send(messages.reverse())
}

export const getMessagesBefore = async ( req:Request, res:Response ) => {
    const { id, olderMessage } = req.query
    const messagesBefore = await MESSAGES.find({conversationId:id, createdAt: { $lt: olderMessage } })
        .sort({ createdAt: -1 })
        .limit(20);
    return res.send(messagesBefore.reverse());
    
};

export const saveMessage = async ( req:Request, res:Response ):Promise<Object> => {
    const newMessage = new MESSAGES(req.body)
    await newMessage.save()
    return res.status(200).send(newMessage)
}

export const setReadedMessages = async ( req:Request, res:Response ):Promise<Object> => {
    const { conversationId, sender } = req.body

    await MESSAGES.updateMany({ conversationId, sender, readed:false }, { $set: { readed:true } } )

    return res.status(200).json({message:"Message set as readed"})
}
