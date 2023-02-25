import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { MessageFormat } from "../../types";
import Message from "./Message";

const Conversation = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const { state } = useContext(ChatContext)
    const [ messages, setMessages ] = useState<MessageFormat[]>()

    const getMessages = () => {
        axios.get(`http://localhost:3000/get/messages?id=${state.currentContact.id}`, { withCredentials: true })
            .then(res => setMessages(res.data))
            .catch(err => console.log(err))    
    }
    console.log(messages)
    useEffect(() => {
       getMessages() 
    }, [state.currentContact]);

    return ( 
        <div className="flex flex-col h-full overflow-y-auto">
            {
                messages?.map((message) => (
                    <div className="w-full first:mt-auto" key={message._id}>
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
        </div>
     );
}
 
export default Conversation;