import { createContext } from "react";
import { ChatState } from "../../types";

interface ChatCtx {
    state:ChatState,
    setState:React.Dispatch<React.SetStateAction<ChatState>>,
    getContacts: () => void
}

export const ChatContext = createContext<ChatCtx>({} as  ChatCtx)

