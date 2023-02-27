import { useContext } from "react";
import { ChatContext } from "../../context/chat/chatContext";

interface ContactProps {
    username: string,
    img: string,
    online?: boolean,
    lastMessage?: string
}

const Contact = ({username, online, img, lastMessage }:ContactProps) => {
    
    const { state } = useContext(ChatContext)
    
    return ( 
        <>
            <div className="w-full flex items-center py-6 gap-4 hover:bg-slate-100/80 p-2 rounded-md">
                <div className="relative p-1 rounded-full w-fit bg-primary">
                    <img src={ img } alt={username} className="w-14 h-fit"/>
                    <div className="absolute border-2 border-secondary p-1 bg-green-500 rounded-full right-0 bottom-0"></div>
                </div>
                <div className="w-[calc(80%)] max-w-[20rem] gap-[0.5]">
                    <h4 className="text-slate-800/80 font-bold text-start">{ username }</h4>
                    <p className=" text-xs font-medium text-slate-800/40 text-start truncate">{lastMessage}</p>
                </div>
            </div>
        </>
     );
}
 
export default Contact;