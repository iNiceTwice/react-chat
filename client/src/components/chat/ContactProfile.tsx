import { ChatContext } from "../../context/chat/chatContext";
import { useContext } from "react"
import UserProfile from "./UserProfile";
import { IoCloseOutline } from "react-icons/io5";

const ContactProfile = () => {

    const { state, setState } = useContext(ChatContext)

    const handleClick = () => {
        setState(prev => ({...prev, showContactProfile:false}))
    }

    if(state.showContactProfile){
        return ( 
            <div className="relative lg:flex flex-col md:w-[22rem] md:border-l-2 border-slate-100 bg-secondary w-full">
                <button onClick={handleClick} className="absolute z-20 top-0 m-6">
                    <IoCloseOutline className="text-white" size={30} />
                </button>
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