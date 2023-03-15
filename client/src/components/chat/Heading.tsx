import { useContext } from "react"
import { ChatContext } from "../../context/chat/chatContext";
import { CiVideoOn, CiPhone } from "react-icons/ci"
import ContactSkeleton from "./ContactSkeleton";
import Menu from "./Menu";

const Heading = () => {

    const { state, setState } = useContext(ChatContext)

    const handleClick = () => {
        setState(prev => ({
            ...prev, 
            showContactProfile: !prev.showContactProfile,
            menuContent:"contactProfile"
        }))
    }

    return ( 
        <div className="flex">
            <button onClick={handleClick} className="flex items-center justify-between w-full h-32 px-6 py-2 border-b-2 border-slate-100 bg-secondary active:bg-slate-100 transition-colors">
                {
                    state.isLoadingContacts ?
                    <div className="w-2/3 md:w-1/4">
                        <ContactSkeleton/>
                    </div> 
                    :
                    <>
                        <div className="flex items-center gap-6">
                            <div className="p-2 rounded-full bg-primary">
                                <img src={ state.currentConversation?.contactImage } alt={ state.currentConversation?.contactName } className="w-14" />
                            </div>
                            <div className="flex flex-col items-start">
                                <h2 className="text-2xl font-semibold text-slate-800/80">{ state.currentConversation?.contactName }</h2>
                                {
                                    state.currentConversation?.isOnline ?
                                    <p className="text-green-500 font-semibold text-sm">Online</p>
                                    :
                                    <p className="text-slate-400 font-semibold text-sm">Offline</p>
                                }   
                            </div>
                        </div>
                        <div className="flex gap-4 text-slate-600">
                            <CiVideoOn size={25} />
                            <CiPhone size={25} />
                        </div>        
                    </>
                }
            </button>
            <div className="h-full flex items-center md:hidden mr-4">
                <Menu/>
            </div>
        </div>
     );
}
 
export default Heading;