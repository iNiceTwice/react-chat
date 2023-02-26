import { useState, useEffect, useRef } from "react"
import { ChatContext } from "./chatContext"
import { ChatState } from "../../types";
import { io, Socket } from "socket.io-client"
import axios from "../../api/axios.config"

interface Props {
     children: JSX.Element | JSX.Element[];
}

const initialState:ChatState = {
    sideContent:"contacts",
    contactsData:[],
    currentContact:{
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
            .then(res => setState(prev => ({...prev, contactsData:res.data, currentContact:res.data[0]})))        
            .catch(err => console.log(err))        
    }

    const sendMessage = (senderID:string) => {
    }
    
    useEffect(() => {
        getContacts()
    }, []);
    
    useEffect(() => {
        socket.current = io("http://localhost:3000")
        socket.current.emit("add-user", user.publicId )
        
    }, [socket]);    

    return (
        <ChatContext.Provider
            value={{
                state,
                setState,
                addUserSocket
            }}
        >
            { children }
        </ChatContext.Provider>
    )
}