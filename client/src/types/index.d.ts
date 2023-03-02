export interface HomeState {
    authOption: "login" | "register" | "guest" | null
}

export interface ChatState {
    sideContent: "addContact" | "folders" | "contacts" | "logout" | "settings",
    contactsData: ContactData[],
    currentMessage:Omit<SocketMessage, "createdAt" | "_id">
    currentConversation:ContactData
}

export interface User {
    username: string,
    email:string,
    password:string
}

export interface ContactData {
    id:Types.ObjectId,
    isOnline:boolean,
    contactName:string,
    contactImage:string,
    contactID:string,
    lastMessage?:{
        sender:string
        text:string,
        sendedAt:Date
    }
}

export interface MessageFormat {
  _id:Types.ObjectId,
  conversationId:string,
  sender:string,
  text:string,
  createdAt:Date
}

interface SocketMessage extends MessageFormat {
    receiver:string,
}