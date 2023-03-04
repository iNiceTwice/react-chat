import ContactList from './ContactList'
import { useContext } from "react"
import { ChatContext } from '../../context/chat/chatContext'
import AddContact from './addContact'
import Settings from './Settings'

const SideDisplay = () => {

    const { state } = useContext(ChatContext)

    return ( 
        <div className="bg-secondary border-r-2 border-slate-100 h-full md:min-w-[25rem] sm:block hidden">
            { state.sideContent === "contacts" && <ContactList/> }
            { state.sideContent === "addContact" && <AddContact/> }
            { state.sideContent === "settings" && <Settings/> }
        </div>
     );
}
 
export default SideDisplay;