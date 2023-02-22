import { useState, useEffect } from "react"
import { ChatContext } from "./chatContext"
import { ChatState } from "../../types";

interface Props {
     children: JSX.Element | JSX.Element[];
}

const initialState:ChatState = {
    sideContent:"contacts"
}

export const ChatProvider = ({children}:Props) => {
    const [ state, setState ] = useState<ChatState>(initialState)
    
    return (
        <ChatContext.Provider
            value={{
                state,
                setState
            }}
        >
            { children }
        </ChatContext.Provider>
    )
}