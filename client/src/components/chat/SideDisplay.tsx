import ContactList from './ContactList'
import { useContext } from "react"
import { ChatContext } from '../../context/chat/chatContext'

const SideDisplay = () => {

    const { state } = useContext(ChatContext)

    return ( 
        <div className="flex">
            { state.sideContent === "contacts" && <ContactList/> }
            { state.sideContent === "settings" && <div>test</div> }
        </div>
     );
}
 
export default SideDisplay;