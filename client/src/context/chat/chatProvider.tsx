import { useState, useEffect, useRef } from "react"
import { ChatContext } from "./chatContext"
import { ChatState, ContactData, SocketMessage } from "../../types";
import { io, Socket } from "socket.io-client"
import axios from "../../api/axios.config"

interface Props {
     children: JSX.Element | JSX.Element[];
}

const initialState:ChatState = {
    sideContent:"contacts",
    sideContactData:false,
    contactsData:[],
    currentMessage:{
        conversationId:"",
        sender:"",
        receiver:"",
        text:""
    },
    currentConversation:{
        id:"",
        isOnline:false,
        contactName:"",
        contactImage:"",
        contactID:"",
        unreadMessages:0,
        lastMessage:{
            sender:"",
            text:"",
            sendedAt:new Date()
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
            .then(res => {
                socket.current?.emit("add-user", { 
                    userID:user.publicId,
                    contacts:res.data
                })              
                socket.current?.on("send-connected", onlineContacts => {
                    let connected = [...res.data]
                    connected.map((contact, i) => {
                        onlineContacts.map((onlineContact:{userID:string, socketID:string}) => {
                            if(onlineContact.userID === contact.contactID){
                                connected[i].isOnline = true
                            }
                        })
                    })
                    setState(prev => ({...prev, contactsData:connected, currentConversation:res.data[0]}))
                })
                socket.current?.on("send-disconnected", (user) => {
                    const contactIndex = res.data.findIndex((contact:ContactData) => contact.contactID === user.userID)
                    let newContactsData = [...res.data]
                    newContactsData[contactIndex].isOnline = false
                    setState(prev => ({...prev, contactsData:newContactsData}))

                })                                                
            })        
            .catch(err => console.log(err))       
    }

    const sendMessage = ( message:Omit<SocketMessage, "createdAt" | "_id"> ):void => {
        socket.current?.emit("send-message", message)

        setState(prev => ({
            ...prev,
            currentMessage:message,
            contactsData:prev.contactsData.map(contact => {
                if(contact.id === message.conversationId) {
                    return {
                        ...contact,
                        lastMessage:{
                            sender:message.sender,
                            text:message.text,
                            sendedAt: new Date()
                        }
                    }
                }
                return contact
            })
        }))
    }
    

    const getMessage = () => {
        socket.current?.on("get-message", ( message:Omit<SocketMessage, "createdAt" | "_id">):void => {

            if(message.conversationId === state.currentConversation?.id){
                axios.put("/messages",{
                    conversationId:message.conversationId,
                    sender:message.sender,
                })
            }

            setState(prev => ({
                ...prev, 
                currentMessage:message,
                contactsData:prev.contactsData.map((contact, i) => {
                if(contact.id === message.conversationId) {
                    return {
                        ...contact,
                        unreadMessages:message.conversationId !== prev.currentConversation?.id ? contact.unreadMessages + 1 : 0,
                        lastMessage:{
                            sender:message.sender,
                            text:message.text,
                            sendedAt: new Date()
                        }
                    }
                }
                return contact
                })
            }))
        })
    }


    useEffect(() => {
        socket.current = io("http://localhost:3001")
        getContacts()
        getMessage()
    }, []);    //antes estaba state.currentConversation y currentMessage verif si hay errores

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