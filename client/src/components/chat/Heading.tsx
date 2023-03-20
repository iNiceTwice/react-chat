import { useContext } from "react"
import { ChatContext } from "../../context/chat/chatContext";
import { CiVideoOn, CiPhone } from "react-icons/ci"
import ContactSkeleton from "./ContactSkeleton";
import Menu from "./Menu";
import { toast } from "react-toastify";

const Heading = () => {

    const { state, setState } = useContext(ChatContext)
    
    const notify = () => toast.warning("Feature coming soon...")

    const handleClick = () => {
        if(state.currentConversation){
            setState(prev => ({...prev, showContactProfile: !prev.showContactProfile}))
        }
    }

    const comingSoon = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        notify()
    }
    
    if(state.currentConversation.id === ""){
        return (
            <>
                <div className="flex items-center justify-between w-full h-32 px-6 py-2 border-b-2 dark:border-tertiary_dark dark:bg-secondary_dark border-slate-100 bg-secondary active:bg-slate-100 transition-colors"></div>
            </>
        )
    }

    return ( 
        <div className="flex">
            <div className="flex justify-between items-center w-full border-b-2 border-slate-100 bg-secondary dark:border-tertiary_dark dark:bg-secondary_dark px-4 md:px-10">
                <button onClick={handleClick} className="flex items-center w-full h-32 py-2 active:bg-slate-100 transition-colors">
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
                                    <h2 className="text-3xl font-semibold dark:text-slate-100 text-slate-800/80">{ state.currentConversation?.contactName }</h2>
                                    {
                                        state.currentConversation?.isOnline ?
                                        <p className="text-green-500 font-semibold text-sm">Online</p>
                                        :
                                        <p className="text-slate-400 font-semibold text-sm">Offline</p>
                                    }   
                                </div>
                            </div>
                        </>
                    }
                </button>
                <div className="md:flex gap-4 text-slate-600 dark:text-slate-100 hidden">
                    <button className="flex items-center justify-center h-10 w-10 dark:hover:bg-primary hover:bg-slate-100 transition colors rounded-full" onClick={event => comingSoon(event)}>
                        <CiVideoOn size={25} />
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 dark:hover:bg-primary hover:bg-slate-100 transition colors rounded-full" onClick={event => comingSoon(event)}>
                        <CiPhone size={25} />
                    </button>
                </div>        
            </div>
            <div className="h-full flex items-center md:hidden pr-4 border-b-2 border-slate-100 bg-secondary dark:border-tertiary_dark dark:bg-secondary_dark">
                <Menu/>
            </div>
        </div>
     );
}
 
export default Heading;