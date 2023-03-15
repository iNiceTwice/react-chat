import { IoMenuOutline, IoCloseOutline } from "react-icons/io5"
import { useContext, useState } from "react"
import { ChatContext } from "../../context/chat/chatContext";
import { ChatState } from "../../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {

    const { state, setState } = useContext(ChatContext)
    const [showMenu, setShowMenu] = useState<Boolean>(false);
    const navigate = useNavigate()

    const handleClickMenu = () => {
        setShowMenu(prev => !prev)
    }

     const handleLogout = () => {
        axios.get("/logout", { withCredentials: true })
            .then(() => {
                navigate("/")
                localStorage.removeItem("chatUser")
            })
            .catch((err)=> console.log(err))
    }   

    const handleClickItemMenu = (option:Pick<ChatState, "menuContent">) => {
        setState(prev => ({
            ...prev, 
            menuContent:option.menuContent,
            showContactProfile:false
        }))
        handleClickMenu()
    }

    return ( 
        <>
            <button onClick={handleClickMenu} className="relative z-50 text-slate-800/80 flex items-center justify-center w-12 h-12 md:hidden hover:bg-primary hover:text-white transition-colors rounded-full">
                {
                    showMenu ? 
                    <IoCloseOutline size={30} />
                    :
                    <IoMenuOutline size={30} />
                }
            </button>
            {
                showMenu &&
                <div className="fixed overflow-auto z-20 top-0 left-0 pt-32 text-primary font-semibold text-xl bg-terceary w-screen h-full flex flex-col">
                    <button 
                        onClick={() => handleClickItemMenu({menuContent:"addContact"})} 
                        className={`px-4 py-6 w-full transition-colors ${state.menuContent === "addContact" ? "bg-white" : ""} hover:bg-white`}>
                            Add a contact
                    </button>
                    <button 
                        onClick={() => handleClickItemMenu({menuContent:"folders"})} 
                        className={`px-4 py-6 w-full transition-colors ${state.menuContent === "folders" ? "bg-white" : ""} hover:bg-white`}>
                            Folders
                    </button>
                    <button 
                        onClick={() => handleClickItemMenu({menuContent:"contacts"})} 
                        className={`px-4 py-6 w-full transition-colors ${state.menuContent === "contacts" ? "bg-white" : ""} hover:bg-white`}>
                            Contacts
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="px-4 py-6 w-full transition-colors hover:bg-white">
                            Logout
                    </button>
                    <button 
                        onClick={() => handleClickItemMenu({menuContent:"settings"})} 
                        className={`px-4 py-6 w-full transition-colors ${state.menuContent === "settings" ? "bg-white" : ""} hover:bg-white`}>
                            Settings
                    </button>
                </div>
            }
        </>
     );
}
 
export default Menu;