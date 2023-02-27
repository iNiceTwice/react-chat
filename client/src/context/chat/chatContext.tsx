import { createContext } from "react";
import { ChatState, SocketMessage} from "../../types";

interface ChatCtx {
    state:ChatState,
    setState:React.Dispatch<React.SetStateAction<ChatState>>,
    sendMessage: ({sender, receiver, text}:Pick<SocketMessage, "sender" | "text" | "receiver">) => void,
}

export const ChatContext = createContext<ChatCtx>({} as  ChatCtx)

