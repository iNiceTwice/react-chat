import axios from "../../api/axios.config";
import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { MessageFormat, SocketMessage } from "../../types";
import Message from "./Message";

const Conversation = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const { state } = useContext(ChatContext)
    const [ messages, setMessages ] = useState<MessageFormat[]>()
    const [ newMessages, setNewMessages ] = useState<Pick<SocketMessage, "sender" | "text" | "receiver">[]>([])
    const localTime = new Date().toJSON()
    const scrollRef = useRef<HTMLDivElement>(null)

    const getMessages = () => {
        axios.get(`/messages?id=${state.currentContact.id}`)
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))    
    }
    
    useEffect(() => {
       getMessages()
    }, [state.currentContact]);
    
    useEffect(() => {
        if(state.currentMessage.sender !== ""){
            setNewMessages(prev => ([...prev, state.currentMessage])) 
        }
    }, [state.currentMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, newMessages]);

    return ( 
        <div className="flex flex-col h-full overflow-y-auto">
            {
                messages?.map((message) => (
                    <div ref={scrollRef} className="w-full first:mt-auto" key={message._id}>
                        <Message 
                            image={state.currentContact.contactImage} 
                            from={message.sender} 
                            text={message.text} 
                            own={user.name === message.sender}
                            sendedAt={message.createdAt}
                        />
                    </div> 
                ))
            }
            {
                newMessages?.map((message, index) => {
                    
                    return (
                        <div ref={scrollRef} className="w-full first:mt-auto" key={index}>
                            <Message 
                                image={state.currentContact.contactImage} 
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