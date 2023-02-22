import ContactList from './ContactList'
import { useContext } from "react"
import { ChatContext } from '../../context/chat/chatContext'

const SideDisplay = () => {

    const { state } = useContext(ChatContext)

    return ( 
        <div className="bg-secondary border-r h-full w-96 p-5 sm:block hidden">
            { state.sideContent === "contacts" && <ContactList/> }
            { state.sideContent === "settings" && <div>test</div> }
        </div>
     );
}
 
export default SideDisplay;