import axios from "../../api/axios.config";
import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { MessageFormat, SocketMessage } from "../../types";
import Message from "./Message";
import { CircularProgress } from "@mui/material";

const Conversation = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const { state } = useContext(ChatContext)
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [ messages, setMessages ] = useState<MessageFormat[]>([])
    const [ newMessages, setNewMessages ] = useState<Omit<SocketMessage, "createdAt" | "_id">[]>([])
    const [ currentNewMessages, setCurrentNewMessages ] = useState<Omit<SocketMessage, "createdAt" | "_id">[]>([])
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const firstMessageRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const getMessages = () => {
        axios.get(`/messages?id=${state.currentConversation.id}`)
            .then(res => {
                 setMessages(res.data)
                 setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })    
    }
    
    const handleScroll = () => {
        const olderMessage = messages[0].createdAt
        const containerPos = containerRef.current?.scrollTop
    
        if (containerPos === 0 && olderMessage) {
            setIsLoading(true)
            axios.get(`/before-messages?id=${state.currentConversation.id}&olderMessage=${olderMessage}`)
            .then(res => {
                setMessages(prev => ([...res.data,...prev ]))
                setIsLoading(false)
            })
            .catch(err => console.log(err))
            firstMessageRef.current?.scrollIntoView()
        }
    }

    useMemo(() => {
        if(state.currentMessage.text !== ""){
            setNewMessages(prev => ([...prev, state.currentMessage]))
        }
    }, [state.currentMessage])
    
    useMemo(() => {
        setCurrentNewMessages(prev => [...newMessages.filter(message => message.conversationId === state.currentConversation.id)])
    }, [messages, newMessages])
    
    useEffect(() => {
        setNewMessages(prev => [...newMessages.filter(message => message.conversationId !== state.currentConversation.id)])
        getMessages()
    }, [state.currentConversation])
    
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView()
    }, [messages])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior:"smooth"})
    }, [currentNewMessages])

    return ( 
        <div onScroll={handleScroll} ref={containerRef} className="flex flex-col w-full pb-2 h-full overflow-y-auto styled-scrollbar">
            { isLoading && 
                <>
                    <div className="w-full h-full flex items-center justify-center py-4">
                        <CircularProgress />
                    </div>
                </>
            }
            {
                messages?.map((message, index) => {

                    const previousMessage = messages[index - 1]

                    return (
                        <div ref={index === 0 ? firstMessageRef : lastMessageRef} className="w-full first:mt-auto" key={message._id}>
                            <Message
                                onlyText={previousMessage?.sender === message.sender} 
                                image={state.currentConversation.contactImage} 
                                from={message.sender} 
                                text={message.text} 
                                own={user.name === message.sender}
                                sendedAt={new Date(message.createdAt).toTimeString().slice(0,5)}
                            />
                        </div> 
                    )
                })
            }
            {
                currentNewMessages?.map((message, index) => {

                    const previousMessage = currentNewMessages[index - 1]

                    return (
                        <div ref={lastMessageRef} className="w-full first:mt-auto" key={index}>
                            <Message 
                                onlyText={previousMessage?.sender === message.sender}
                                image={state.currentConversation.contactImage} 
                                from={message.sender} 
                                text={message.text} 
                                own={user.name === message.sender}
                                sendedAt={new Date().toTimeString().slice(0,5)}
                            />
                        </div> 
                    )
                })                
            } 
        </div>
     );
}
 
export default Conversation;