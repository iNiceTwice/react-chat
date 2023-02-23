export interface HomeState {
    authOption: "login" | "register" | "guest" | null
}

export interface ChatState {
    sideContent: "addContact" | "folders" | "contacts" | "logout" | "settings"
}

export interface User {
    username: string,
    email:string,
    password:string
}

export interface ConversationData {
    id:Types.ObjectId,
    contactName:string,
    contactImage:string,
    contactID:string,
    lastMessage:{
        text:string,
        sendedAt:string
    }
}