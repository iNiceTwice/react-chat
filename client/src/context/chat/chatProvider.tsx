import { useState, useEffect, useRef, useMemo } from "react"
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
            sendedAt:new Date().toString()
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
                    
                    setState(prev => ({
                        ...prev,
                        contactsData:sortByDate(connected),
                        currentConversation:sortByDate(connected)[0]
                    }))
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

        setState(prev => {
            const updatedContactsData = prev.contactsData.map(contact => {
                if(contact.id === message.conversationId) {
                    return {
                        ...contact,
                        lastMessage:{
                            sender:message.sender,
                            text:message.text,
                            sendedAt: new Date().toString()
                        }
                    }
                }
                return contact
            })
            
            return {
                ...prev,
                currentMessage:message,
                contactsData:sortByDate(updatedContactsData)
            }
        })
    }
    

    const getMessage = () => {
        socket.current?.on("get-message", ( message:Omit<SocketMessage, "createdAt" | "_id">):void => {

            if(message.conversationId === state.currentConversation?.id){
                axios.put("/messages",{
                    conversationId:message.conversationId,
                    sender:message.sender,
                })
            }

            setState(prev => {
                const updatedContactsData = prev.contactsData.map((contact, i) => {
                    if(contact.id === message.conversationId) {
                        return {
                            ...contact,
                            unreadMessages:message.conversationId !== prev.currentConversation?.id ? contact.unreadMessages + 1 : 0,
                            lastMessage:{
                                sender:message.sender,
                                text:message.text,
                                sendedAt: new Date().toString()
                            }
                        }
                    }
                    return contact
                })

                return{
                    ...prev, 
                    currentMessage:message,
                    contactsData:sortByDate(updatedContactsData)
                }
            })
        })
    }
    
    const sortByDate = (array:ContactData[]) => {
        return array.sort((a, b) => {
            const dateA = a.lastMessage ? Date.parse(a.lastMessage.sendedAt) : undefined;
            const dateB = b.lastMessage ? Date.parse(b.lastMessage.sendedAt) : undefined;
            return (dateB ?? 0) - (dateA ?? 0);
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