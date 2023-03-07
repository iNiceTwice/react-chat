import axios from "../../api/axios.config";
import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { MessageFormat, SocketMessage } from "../../types";
import Message from "./Message";

const Conversation = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const { state } = useContext(ChatContext)
    const [ messages, setMessages ] = useState<MessageFormat[]>()
    const [ newMessages, setNewMessages ] = useState<Omit<SocketMessage, "createdAt" | "_id">[]>([])
    const [ currentNewMessages, setCurrentNewMessages ] = useState<Omit<SocketMessage, "createdAt" | "_id">[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    const getMessages = () => {
        axios.get(`/messages?id=${state.currentConversation.id}`)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))    
    }

    useEffect(() => {
        setNewMessages(prev => [...newMessages.filter(message => message.conversationId !== state.currentConversation.id)])
        getMessages()
    }, [state.currentConversation]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    }, [messages, currentNewMessages]);
    
    useMemo(() => {
        if(state.currentMessage.text !== ""){
            setNewMessages(prev => ([...prev, state.currentMessage]))
        }
    }, [state.currentMessage]);

    useMemo(() => {
        setCurrentNewMessages(prev => [...newMessages.filter(message => message.conversationId === state.currentConversation.id)])
    }, [messages, newMessages]);

    
    return ( 
        <div className="flex flex-col w-full pb-2 h-full overflow-y-auto styled-scrollbar">
            {
                messages?.map((message, index) => {

                    const previousMessage = messages[index - 1]

                    return (
                        <div ref={scrollRef} className="w-full first:mt-auto" key={message._id}>
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
                        <div ref={scrollRef} className="w-full first:mt-auto" key={index}>
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