import { useContext } from "react"
import { ChatContext } from "../../context/chat/chatContext";

const Heading = () => {

    const { state } = useContext(ChatContext)

    return ( 
        <div className="flex w-full h-32 p-2 gap-6 items-center border-b bg-secondary">
            <div className=" ml-6">
                <div className="p-2 rounded-full bg-primary">
                    <img src={ state.currentConversation?.contactImage } alt={ state.currentConversation?.contactName } className="w-14" />
                </div>
            </div>
            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-slate-800/80">{ state.currentConversation?.contactName }</h2>
                <p className="text-green-500 font-semibold text-sm">Online</p>
            </div>
        </div>
     );
}
 
export default Heading;