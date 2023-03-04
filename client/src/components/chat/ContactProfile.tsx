import { ChatContext } from "../../context/chat/chatContext";
import { useContext } from "react"
import UserProfile from "./UserProfile";

const ContactProfile = () => {

    const { state } = useContext(ChatContext)

    if(state.sideContactData){
        return ( 
            <div className="flex flex-col w-[22rem] border-l-2 border-slate-100 bg-secondary">
                <UserProfile
                    username={state.currentConversation.contactName}
                    img={state.currentConversation.contactImage}
                    publicId={state.currentConversation.contactID}
                />
            </div>
         );
    }

    return <></>
}
 
export default ContactProfile;