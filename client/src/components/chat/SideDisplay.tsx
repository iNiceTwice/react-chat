import { ChatContext } from '../../context/chat/chatContext'
import { CiDark, CiLight } from "react-icons/ci";
import ContactList from './ContactList'
import UserProfile from './UserProfile'
import AddContact from './AddContact'
import { useContext } from "react"
import Folders from './Folders';
import Settings from './Settings';

const SideDisplay = () => {

    const { state } = useContext(ChatContext)

    return ( 
        <div className="bg-secondary dark:bg-secondary_dark border-r-2 border-slate-100 dark:border-tertiary_dark h-full w-full md:w-[40rem]">
            { (state.menuContent === "contacts" || state.menuContent === "chat") && <ContactList/> }
            { state.menuContent === "addContact" && <AddContact/> }
            { state.menuContent === "settings" && <Settings/> }
            { state.menuContent === "folders" && <Folders/> }
        </div>
     );
}
 
export default SideDisplay;