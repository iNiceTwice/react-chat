import { useState, useEffect, useRef } from "react"
import { ChatContext } from "./chatContext"
import { ChatState, SocketMessage } from "../../types";
import { io, Socket } from "socket.io-client"
import axios from "../../api/axios.config"

interface Props {
     children: JSX.Element | JSX.Element[];
}

const initialState:ChatState = {
    sideContent:"contacts",
    contactsData:[],
    currentMessage:{
        conversationId:"",
        sender:"",
        receiver:"",
        text:""
    },
    currentConversation:{
        id:"",
        contactName:"",
        contactImage:"",
        contactID:"",
        lastMessage:{
            text:"",
            sendedAt:""
        }
    }
}

export const ChatProvider = ({children}:Props) => {
    
    let socket = useRef<Socket>()
    const [ state, setState ] = useState<ChatState>(initialState)
    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const encodedUserID = user.publicId.replace("#","%23")

    const getContacts = ():void => {
        axios.get(`/conversation?userID=${encodedUserID}`)
            .then(res => setState(prev => ({...prev, contactsData:res.data, currentConversation:res.data[0]})))        
            .catch(err => console.log(err))       
    }

    const sendMessage = ({sender, receiver, text, conversationId}:Omit<SocketMessage, "createdAt" | "_id">):void => {
        socket.current?.emit("send-message", {sender, receiver, text, conversationId})
        setState(prev => ({...prev, currentMessage:{conversationId, sender, receiver, text}}))
    }

    const getMessage = () => {
        socket.current?.on("get-message", message => {
            setState(prev => ({...prev, currentMessage:message}))
            console.log(message, "from provider")
        })
    }
    
    useEffect(() => {
        getContacts()
    }, []);
    
    useEffect(() => {
        socket.current = io("http://localhost:3001")
        socket.current.emit("add-user", user.publicId)
    }, [socket]);    
    
    
    useEffect(() => {
        getMessage()
    }, [state.currentMessage, state.currentConversation]);

    return (
        <ChatContext.Provider
            value={{
                state,
                setState,
                sendMessage
            }}
        >
            { children }
        </ChatContext.Provider>
    )
}