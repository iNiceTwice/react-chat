import { createContext } from "react";
import { ChatState, SocketMessage} from "../../types";

interface ChatCtx {
    state:ChatState,
    setState:React.Dispatch<React.SetStateAction<ChatState>>,
    sendMessage: ({sender, receiver, text}:Omit<SocketMessage, "createdAt" | "_id">) => void,
    getContacts: () => void,
}

export const ChatContext = createContext<ChatCtx>({} as  ChatCtx)

