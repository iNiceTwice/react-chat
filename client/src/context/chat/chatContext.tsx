import { createContext } from "react";
import { ChatState, SocketMessage, ContactData, getContactsProps} from "../../types";

interface ChatCtx {
    state:ChatState,
    setState:React.Dispatch<React.SetStateAction<ChatState>>,
    sendMessage: ({sender, receiver, text}:Omit<SocketMessage, "createdAt" | "_id">) => void,
    getContacts: (options?:getContactsProps) => void
}

export const ChatContext = createContext<ChatCtx>({} as  ChatCtx)

