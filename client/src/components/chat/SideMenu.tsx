import Logo from "../../assets/logo.png"
import { CiChat1, CiSettings, CiFolderOn, CiUser, CiLogout } from "react-icons/ci"
import { ChatContext } from "../../context/chat/chatContext";
import { useContext } from "react";
import { ChatState } from "../../types";
import axios from "../../api/axios.config";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {

    const { state, setState } = useContext(ChatContext)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const buttonStyles = {
        selected:"relative p-3 rounded-xl bg-primary text-white" ,
        unselected:"relative p-3 rounded-xl hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors"
    }

    const handleLogout = () => {
        axios.get("/logout", { withCredentials: true })
            .then(() => {
                navigate("/")
                localStorage.removeItem("chatUser")
            })
            .catch((err)=> console.log(err))
    }

    return ( 
        <div className="h-full flex flex-col justify-between items-center px-1 w-24 lg:w-28">
            <button className="mt-12">
                <img src={Logo} width={35} className="hover:rotate-12 transition-all"/>
            </button>
            <div className="flex flex-col gap-6">
                <button onClick={()=> setState(prev => ({...prev, menuContent:"addContact"}))} className={ state.menuContent === "addContact" ? buttonStyles.selected : buttonStyles.unselected}>
                    <div className="flex items-center justify-center">
                        <CiUser className="-ml-1" size={24}/>
                        <span className="absolute top-2 left-[60%]">+</span>
                    </div>
                </button>
                <button 
                    onClick={()=> setState(prev => ({...prev, menuContent:"folders"}))} 
                    className={ state.menuContent === "folders" ? buttonStyles.selected : buttonStyles.unselected}
                >
                    <CiFolderOn size={24}/>
                </button>
                <button 
                    onClick={()=> setState(prev => ({...prev, menuContent:"contacts"}))} 
                    className={ state.menuContent === "contacts" || state.menuContent === "chat" ? buttonStyles.selected : buttonStyles.unselected }
                >
                    <CiChat1 size={24}/>
                </button>
                <button 
                    onClick={ handleLogout }
                    className={ buttonStyles.unselected }
                >
                    <CiLogout size={24}/>
                </button>
                <button 
                    onClick={()=> setState(prev => ({...prev, menuContent:"settings"}))} 
                    className={ state.menuContent === "settings" ? buttonStyles.selected : buttonStyles.unselected }
                >
                    <CiSettings size={24}/>
                </button>

            </div>
            <div className="flex flex-col mb-12">
                <button onClick={()=> setState(prev => ({...prev, menuContent:"settings"}))} className="p-2 rounded-full bg-white hover:bg-primary transition-colors shadow-md">
                    <img src={user.profileImage} alt={user.username} className="w-10"/>
                </button>
            </div>
        </div>
     );
}
 
export default SideMenu;