import { Response, Request } from "express"
import CONVERSATIONS from "../models/conversation.model"
import USERS from "../models/users.model"
import { ConversationDocument } from "../types";



export const addConversation = async (req: Request, res:Response):Promise<Object> => {
    const { newContact, user } = req.body
    const contactExists = await USERS.find({publicId:newContact})
    
    if(newContact === user) return res.status(500).json({message:"You can't add yourself to contacts."})
    
    if(!user || !newContact) return res.status(500).json({message:"A conversation must have 2 contacts."})
    
    if(contactExists.length === 0) return res.status(404).json({message:"User not found"})
    
    const conversationExists = await CONVERSATIONS.find({members:newContact})
    if(conversationExists) return res.status(500).json({message:"Contact already added."})

    const newConversation = new CONVERSATIONS({members:[user, newContact]})
    await newConversation.save()

    return res.status(200).json(newConversation)
}

export const getConversation = async (req: Request, res:Response) => {
    const { userID } = req.query
    const conversations = await CONVERSATIONS.find({members:userID})
    let conversationData:Object[] = []
    
    Promise.all(conversations.map(async (conversation:ConversationDocument)=>{
        const contactID = conversation.members.find((conversation:Object) => conversation !== userID) as string
        const contact = await USERS.find({publicId:contactID})
        conversationData.push({
            id:conversation._id,    
            contactID:contact[0].publicId,
            contactImage:contact[0].profileImage,
            contactName:contact[0].username
        })
    })).then(() => {
        return res.send(conversationData)
    })
    
}