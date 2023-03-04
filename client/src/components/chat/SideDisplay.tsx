import { ChatContext } from '../../context/chat/chatContext'
import { CiDark, CiLight } from "react-icons/ci";
import ContactList from './ContactList'
import UserProfile from './UserProfile'
import AddContact from './addContact'
import { useContext } from "react"
import Switch from "../Switch";

const SideDisplay = () => {

    const { state } = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("chatUser") as string)

    return ( 
        <div className="bg-secondary border-r-2 border-slate-100 h-full md:min-w-[25rem] sm:block hidden">
            { state.sideContent === "contacts" && <ContactList/> }
            { state.sideContent === "addContact" && <AddContact/> }
            { state.sideContent === "settings" && 
                <UserProfile 
                    img={user.profileImage}
                    username={user.username}
                    publicId={user.publicId}
                    email={user.email}
                >
                    <div className="flex gap-x-4 text-slate-800 mt-4">
                        <CiLight size={25} />
                        <Switch />
                        <CiDark size={25} />
                    </div> 
                </UserProfile> 
            }
        </div>
     );
}
 
export default SideDisplay;