import ContactList from './ContactList'
import { useContext } from "react"
import { ChatContext } from '../../context/chat/chatContext'
import AddContact from './addContact'
import Settings from './Settings'

const SideDisplay = () => {

    const { state } = useContext(ChatContext)

    return ( 
        <div className="bg-secondary border-r h-full w-[30rem] sm:block hidden">
            { state.sideContent === "contacts" && <ContactList/> }
            { state.sideContent === "addContact" && <AddContact/> }
            { state.sideContent === "settings" && <Settings/> }
        </div>
     );
}
 
export default SideDisplay;