import axios from "axios";
import { useContext, useState } from "react"
import { ChatContext } from "../../context/chat/chatContext";

const ChatInput = () => {
    
    const { state } = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const [ message, setMessage ] = useState<string>("")

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("http://localhost:3000/set/message", {
            conversationId: state.currentContact.id,
            sender:user.name,
            text:message    
        }, { withCredentials: true })
            .then(() => setMessage(""))
            .catch(err => console.log(err))    
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return ( 
        <form onSubmit={ handleSubmit } className="mt-4 flex justify-center w-full py-4 bg-secondary border-t">
            <input
                value={message}
                onChange={ handleChange }
                placeholder="Send a message..."
                className="w-11/12 shadow-sm text-sm outline-none rounded-full bg-slate-100 px-4 py-2"
            />
        </form>
     );
}
 
export default ChatInput;