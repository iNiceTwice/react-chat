import ChatInput from "./ChatInput";
import ContactProfile from "./ContactProfile";
import Conversation from "./Conversation";
import Heading from "./Heading";
import SideDisplay from "./SideDisplay";
import SideMenu from "./SideMenu";

const DesktopChat = () => {
    return ( 
        <div className='w-full h-full md:flex justify-center items-center hidden'>
            <div className='flex overflow-hidden h-full w-full bg-tertiary dark:bg-tertiary_dark'>
                <SideMenu/>
                <SideDisplay/>
                <div className='flex flex-col h-full w-full'>
                    <Heading/>
                    <Conversation/>
                    <ChatInput/>
                </div>
                <div className="flex">
                    <ContactProfile/>
                </div>      
            </div>
        </div>        
     );
}
 
export default DesktopChat;