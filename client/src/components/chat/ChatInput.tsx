import axios from "../../api/axios.config";
import { useContext, useState, useRef } from "react"
import { ChatContext } from "../../context/chat/chatContext";
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { CiFaceSmile } from "react-icons/ci";

const ChatInput = () => {
    
    const { state, sendMessage } = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const [ message, setMessage ] = useState<string>("")
    const [showEmojiPicker, setShowEmojiPicker] = useState<Boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null) 

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(message.trim() === "" || !state.currentConversation) return
        
        setShowEmojiPicker(false)

        axios.post("/message", {
            conversationId: state.currentConversation.id,
            sender:user.name,
            text:message.trim()  
        })
            .then(() => {
                setMessage("")
                sendMessage({
                    conversationId:state.currentConversation.id,
                    sender:user.name,
                    receiver:state.currentConversation.contactID,
                    text:message.trim()
                })
            })
            .catch(err => console.log(err))   
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        const cursorPosition = inputRef.current?.selectionStart as number
        if(cursorPosition){
            const newText = `${message.slice(0, cursorPosition)}${emojiData.emoji}${message.slice(cursorPosition)}`
            setMessage(newText)
            inputRef.current?.focus()
        }else{
            setMessage(emojiData.emoji)
            inputRef.current?.focus()
        }
    };

    const showPicker = ():void => {
        setShowEmojiPicker(prev => !prev)
    }

    return ( 
        <form onSubmit={ handleSubmit } className="flex flex-col items-center gap-2 w-full py-4 bg-secondary border-t-2 border-slate-100">
            <div className="bg-slate-100 flex items-center w-11/12 shadow-sm rounded-full">
                <input
                    ref={inputRef}
                    value={message}
                    onChange={ handleChange }
                    placeholder="Send a message..."
                    className="w-full text-sm outline-none rounded-full bg-slate-100 px-4 py-2"
                />
                <button type="button" onClick={showPicker} className="w-8 h-8 hover:bg-white/60 transition-colors flex items-center justify-center rounded-full mr-4">
                    <CiFaceSmile className="text-slate-400" size={20} />
                </button>
            </div>
            {
                showEmojiPicker && 
                <EmojiPicker 
                    width="100%" 
                    height="12rem"
                    onEmojiClick={handleEmojiClick}
                    searchDisabled
                    previewConfig={{ showPreview:false}}
                    lazyLoadEmojis={true}
                    emojiStyle={EmojiStyle.GOOGLE}    
                />
            }
        </form>
     );
}
 
export default ChatInput;