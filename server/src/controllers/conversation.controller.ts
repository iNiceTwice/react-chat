import { Response, Request } from "express"
import CONVERSATIONS from "../models/conversation.model"
import USERS from "../models/users.model"
import MESSAGES from "../models/message.model"
import { ConversationDocument } from "../types";

interface ConversationFormat {
    id:string,
    isOnline:boolean,    
    contactID:string,
    contactImage:string,
    contactName:string,
    unreadMessages:number,
    lastMessage:{
        sender?:string,
        text?:string,
        sendedAt?:Date
    }    
}


export const addConversation = async (req: Request, res:Response):Promise<Object> => {
    const { newContact, user } = req.body
    const contactExists = await USERS.find({publicId:newContact})
    
    if(newContact === user) return res.status(500).json({message:"You can't add yourself to contacts."})
    
    if(!user || !newContact) return res.status(500).json({message:"A conversation must have 2 contacts."})
    
    if(contactExists.length === 0) return res.status(404).json({message:"User not found"})
    
    const conversationExists = await CONVERSATIONS.find({members:{ $all: [user, newContact] } })
    if(conversationExists.length !== 0) return res.status(500).json({message:"Contact already added."})

    const newConversation = new CONVERSATIONS({members:[user, newContact]})
    await newConversation.save()

    return res.status(200).json(newConversation)
}

export const getConversation = async (req: Request, res:Response) => {
    const { userID } = req.query
    const conversations = await CONVERSATIONS.find({members:userID})
    let conversationData:ConversationFormat[] = []
    
    Promise.all(conversations.map(async (conversation:ConversationDocument)=>{
        const contactID = conversation.members.find((conversation:Object) => conversation !== userID) as string
        const contact = await USERS.find({publicId:contactID})
        const currentMessage = await MESSAGES.findOne({conversationId:conversation._id}).sort({ createdAt: -1 })
        const unreadMessages = await MESSAGES.find({conversationId:conversation._id, readed:false, sender:contact[0].username})

        conversationData.push({
            id:conversation._id.toString(),
            isOnline:false,    
            contactID:contact[0].publicId,
            contactImage:contact[0].profileImage,
            contactName:contact[0].username,
            unreadMessages:unreadMessages.length,
            lastMessage:{
                sender:currentMessage?.sender,
                text:currentMessage?.text,
                sendedAt:currentMessage?.createdAt
            }
        })
    })).then(() => {
        return res.status(200).send(conversationData)
    }).catch(err => res.status(500).json({message:err}))
    
}
