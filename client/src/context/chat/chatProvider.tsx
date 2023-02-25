import { useState, useEffect } from "react"
import { ChatContext } from "./chatContext"
import { ChatState } from "../../types";
import axios from "axios"

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
    const [ state, setState ] = useState<ChatState>(initialState)
    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const encodedUserID = user.publicId.replace("#","%23")

    const getContacts = ():void => {
        axios.get(`http://localhost:3000/get/conversation?userID=${encodedUserID}`, { withCredentials: true })
            .then(res => setState(prev => ({...prev, contactsData:res.data, currentContact:res.data[0]})))        
            .catch(err => console.log(err))        
    }

    useEffect(() => {
        getContacts()
    }, []);

    return (
        <ChatContext.Provider
            value={{
                state,
                setState,
                getContacts
            }}
        >
            { children }
        </ChatContext.Provider>
    )
}