import Logo from "../../assets/logo.png"
import { CiChat1, CiSettings, CiFolderOn, CiUser, CiLogout } from "react-icons/ci"
import { ChatContext } from "../../context/chat/chatContext";
import { useContext } from "react";
import { ChatState } from "../../types";

const SideMenu = () => {

    const { setState } = useContext(ChatContext)

    return ( 
        <div className="h-full flex flex-col justify-between items-center w-24">
            <button className="mt-12">
                <img src={Logo} width={30} className="hover:drop-shadow-xl"/>
            </button>
            <div className="flex flex-col gap-6">
                <button onClick={()=> setState({sideContent:"addContact"})} className="relative p-3 rounded-full hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors">
                    <div className="flex items-center justify-center">
                        <CiUser className="-ml-1" size={25}/>
                        <span className="absolute top-2 left-[60%]">+</span>
                    </div>
                </button>
                <button onClick={()=> setState({sideContent:"folders"})} className="p-3 rounded-full hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors">
                    <CiFolderOn size={25}/>
                </button>
                <button onClick={()=> setState({sideContent:"contacts"})} className="p-3 rounded-full hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors">
                    <CiChat1 size={25}/>
                </button>
                <button onClick={()=> setState({sideContent:"logout"})} className="p-3 rounded-full hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors">
                    <CiLogout size={25}/>
                </button>
                <button onClick={()=> setState({sideContent:"settings"})} className="p-3 rounded-full hover:bg-primary hover:text-white text-slate-400 hover:shadow-sm transition-colors">
                    <CiSettings size={25}/>
                </button>

            </div>
            <div className="flex flex-col mb-12">
                <div className="p-4 rounded-full bg-primary"></div>
            </div>
        </div>
     );
}
 
export default SideMenu;