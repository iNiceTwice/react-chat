import { useState, useEffect, useRef, useMemo } from "react"
import { ChatContext } from "./chatContext"
import { ChatState, ContactData, getContactsProps, SocketMessage } from "../../types";
import { io, Socket } from "socket.io-client"
import axios from "../../api/axios.config"

interface Props {
     children: JSX.Element | JSX.Element[];
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
    
    const getContacts = async (options:getContactsProps = {refresh:false}) => {
        
        const response = await axios.get(`/conversation?userID=${encodedUserID}`)
        const contacts = response.data

        socket.current?.emit("add-user", { 
            userID:user.publicId,
            contacts:contacts
        })

        socket.current?.on("send-connected", onlineContacts => {
            contacts.map((contact:ContactData, i:number) => {
                onlineContacts.map((onlineContact:{userID:string, socketID:string}) => {
                    if(onlineContact.userID === contact.contactID){
                        contacts[i].isOnline = true
                    }
                })
            })
            if(options.refresh){
                setState(prev => ({
                    ...prev,
                    isLoadingContacts:false,
                    contactsData:sortByDate(contacts),
                }))
            }else{
                setState(prev => ({
                    ...prev,
                    isLoadingContacts:false,
                    contactsData:sortByDate(contacts),
                    //currentConversation:sortByDate(contacts)[0]
                }))
            }
        })

        socket.current?.on("send-disconnected", (user) => {
            const contactIndex = contacts.findIndex((contact:ContactData) => contact?.contactID === user?.userID)
            let newContactsData = [...contacts]
            if(contactIndex >= 0){
                newContactsData[contactIndex].isOnline = false
                setState(prev => ({...prev, contactsData:sortByDate(newContactsData)}))
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
    
    const sortByDate = (contacts:ContactData[]) => {
        return contacts.sort((a, b) => {
            const dateA = a.lastMessage ? Date.parse(a.lastMessage.sendedAt) : undefined;
            const dateB = b.lastMessage ? Date.parse(b.lastMessage.sendedAt) : undefined;
            return (dateB ?? 0) - (dateA ?? 0);
        })
    }

    useEffect(() => {
        socket.current = io("http://localhost:3001")
        getContacts()
    }, []);
    
    useMemo(() => {
        getMessage()
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