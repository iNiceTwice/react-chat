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
    const localTime = new Date().toJSON()
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

    
    console.log(currentNewMessages)
    return ( 
        <div className="flex flex-col w-full h-full overflow-y-auto">
            {
                messages?.map((message) => (
                    <div ref={scrollRef} className="w-full first:mt-auto" key={message._id}>
                        <Message 
                            image={state.currentConversation.contactImage} 
                            from={message.sender} 
                            text={message.text} 
                            own={user.name === message.sender}
                            sendedAt={message.createdAt}
                        />
                    </div> 
                ))
            }
            {
                currentNewMessages?.map((message, index) => {
                    return (
                        <div ref={scrollRef} className="w-full first:mt-auto" key={index}>
                            <Message 
                                image={state.currentConversation.contactImage} 
                                from={message.sender} 
                                text={message.text} 
                                own={user.name === message.sender}
                                sendedAt={localTime}
                            />
                        </div> 
                    )
                })                
            } 
        </div>
     );
}
 
export default Conversation;