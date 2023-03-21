import { useState, useEffect, useRef, useMemo } from "react"
import { ChatContext } from "./chatContext"
import { ChatState, ContactData, SocketMessage } from "../../types";
import { io, Socket } from "socket.io-client"
import axios from "../../api/axios.config"

interface Props {
     children: JSX.Element | JSX.Element[];
}

interface OnlineContacts {
    userID:string, 
    socketID:string
}

const initialState:ChatState = {
    menuContent:"contacts",
    showContactProfile:false,
    isLoadingContacts:true,
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
    
    const getContacts = async () => {
        
        const response = await axios.get(`/conversation?userID=${encodedUserID}`)
        const contacts = response.data

        socket.current?.emit("add-user", { 
            userID:user.publicId,
            contacts:contacts
        })

        socket.current?.on("send-connected", onlineContacts => {

            if(state.isLoadingContacts){
                setState(prev => {
                    return {
                        ...prev,
                        contactsData:sortByDate(updateContactStatus(prev.contactsData, onlineContacts)),
                    }
                })
            }

        })

        setState(prev => ({
            ...prev,
            isLoadingContacts:false,
            menuContent:contacts.length === 0 ? "addContact" : "contacts",
            contactsData:sortByDate(contacts),
        }))
        
    }
    
    const updateContactStatus = (contacts:ContactData[], onlineContacts:OnlineContacts[]):ContactData[] => {
        let updatedStatus = [...contacts]
        contacts.map((contact:ContactData, i:number) => {
            onlineContacts.map((onlineContact:{userID:string, socketID:string}) => {
                if(onlineContact.userID === contact.contactID){
                    updatedStatus[i].isOnline = true
                }
            })
        })

        return updatedStatus
    }

    const sendDisconnection = () => {
        
        socket.current?.on("send-disconnected", (user) => {
            const contactIndex = state.contactsData.findIndex((contact:ContactData) => contact?.contactID === user?.userID)
            
            if(contactIndex >= 0){
                setState(prev => {
                    let newContactsData = [...prev.contactsData]
                    newContactsData[contactIndex].isOnline = false
                    return {
                        ...prev, 
                        contactsData:sortByDate(newContactsData)
                    }
                })
            }
        })
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
            setState(prev => {
                const exists = prev.contactsData?.find(contact => contact.id === message.conversationId)
        
                if(!exists){
                    getContacts()

                    if(message.conversationId === prev.currentConversation?.id){
                        axios.put("/messages",{
                            conversationId:message.conversationId,
                            sender:message.sender,
                        })
                    }
                    
                }
                const updatedContactsData = prev.contactsData.map((contact, i) => {
                    if(contact.id === message.conversationId) {

                        return {
                            ...contact,
                            unreadMessages:message.conversationId !== prev.currentConversation?.id || prev.menuContent === "contacts" ? contact.unreadMessages + 1 : 0,
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
    
    const sortByDate = (contacts:ContactData[]) => {
        return contacts.sort((a, b) => {
            const dateA = a.lastMessage ? Date.parse(a.lastMessage.sendedAt) : undefined;
            const dateB = b.lastMessage ? Date.parse(b.lastMessage.sendedAt) : undefined;
            return (dateB ?? 0) - (dateA ?? 0);
        })
    }

    useEffect(() => {
        socket.current = io("https://chatio-server.up.railway.app")
        getContacts()
    }, []);
    
    useMemo(() => {
        getMessage()
        sendDisconnection()
    }, [state.isLoadingContacts]);
    
    return (
        <ChatContext.Provider
            value={{
                state,
                setState,
                sendMessage,
                getContacts
            }}
        >
            { children }
        </ChatContext.Provider>
    )
}