import { ChatContext } from '../../context/chat/chatContext'
import { CiDark, CiLight } from "react-icons/ci";
import ContactList from './ContactList'
import UserProfile from './UserProfile'
import AddContact from './AddContact'
import { useContext } from "react"
import Switch from "../Switch";
import Folders from './Folders';

const SideDisplay = () => {

    const { state } = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("chatUser") as string)

    return ( 
        <div className="bg-secondary border-r-2 border-slate-100 h-full w-full md:w-[40rem]">
            { (state.menuContent === "contacts" || state.menuContent === "chat") && <ContactList/> }
            { state.menuContent === "addContact" && <AddContact/> }
            { state.menuContent === "settings" && 
                <UserProfile 
                img={user.profileImage}
                username={user.username}
                publicId={user.publicId}
                email={user.email}
                >
                    <div className="flex gap-x-4 items-center text-slate-800 mt-4">
                        <CiLight size={25} />
                        <Switch />
                        <CiDark size={25} />
                    </div> 
                </UserProfile> 
            }
            { state.menuContent === "folders" && 
                <Folders/>
            }
        </div>
     );
}
 
export default SideDisplay;