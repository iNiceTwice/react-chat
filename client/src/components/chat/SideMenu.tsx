import Logo from "../../assets/logo.png"
import { CiChat1, CiSettings, CiFolderOn, CiUser, CiLogout } from "react-icons/ci"
import { ChatContext } from "../../context/chat/chatContext";
import { useContext } from "react";
import { ChatState } from "../../types";

const SideMenu = () => {

    const { state, setState } = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const buttonStyles = {
        selected:"relative p-3 rounded-xl bg-primary text-white" ,
        unselected:"relative p-3 rounded-xl hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors"
    }

    return ( 
        <div className="h-full flex flex-col justify-between items-center w-24">
            <button className="mt-12">
                <img src={Logo} width={30} className="hover:drop-shadow-xl"/>
            </button>
            <div className="flex flex-col gap-6">
                <button onClick={()=> setState({sideContent:"addContact"})} className={ state.sideContent === "addContact" ? buttonStyles.selected : buttonStyles.unselected}>
                    <div className="flex items-center justify-center">
                        <CiUser className="-ml-1" size={25}/>
                        <span className="absolute top-2 left-[60%]">+</span>
                    </div>
                </button>
                <button 
                    onClick={()=> setState({sideContent:"folders"})} 
                    className={ state.sideContent === "folders" ? buttonStyles.selected : buttonStyles.unselected}
                >
                    <CiFolderOn size={25}/>
                </button>
                <button 
                    onClick={()=> setState({sideContent:"contacts"})} 
                    className={ state.sideContent === "contacts" ? buttonStyles.selected : buttonStyles.unselected }
                >
                    <CiChat1 size={25}/>
                </button>
                <button 
                    onClick={()=> setState({sideContent:"logout"})}
                    className={ state.sideContent === "logout" ? buttonStyles.selected : buttonStyles.unselected }
                >
                    <CiLogout size={25}/>
                </button>
                <button 
                    onClick={()=> setState({sideContent:"settings"})} 
                    className={ state.sideContent === "settings" ? buttonStyles.selected : buttonStyles.unselected }
                >
                    <CiSettings size={25}/>
                </button>

            </div>
            <div className="flex flex-col mb-12">
                <button className="p-2 rounded-full bg-white hover:bg-primary transition-colors shadow-md">
                    <img src={user.profileImage} alt={user.username} className="w-10"/>
                </button>
            </div>
        </div>
     );
}
 
export default SideMenu;