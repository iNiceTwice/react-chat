import { ChatContext } from "../../context/chat/chatContext";
import { useContext } from "react"
import UserProfile from "./UserProfile";

const ContactProfile = () => {

    const { state } = useContext(ChatContext)

    if(state.showContactProfile){
        return ( 
            <div className="lg:flex flex-col md:w-[22rem] md:border-l-2 border-slate-100 bg-secondary w-full">
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