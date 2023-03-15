import { Switch } from '@mui/material';
import { useContext, useState } from 'react'
import { CiLight, CiDark } from 'react-icons/ci';
import { ChatContext } from '../../context/chat/chatContext';
import AddContact from './AddContact';
import ChatInput from './ChatInput';
import ContactList from './ContactList';
import ContactProfile from './ContactProfile';
import Conversation from './Conversation';
import Folders from './Folders';
import Heading from './Heading';
import SideDisplay from './SideDisplay';
import UserProfile from './UserProfile';


const MobileChat = () => {
    
    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const { state } = useContext(ChatContext)
    
    return ( 
        <div className="flex w-full h-full md:hidden overflow-hidden">
            {
                state.menuContent === "chat" && 
                <div className='flex flex-col h-full w-full bg-terceary'>
                    <Heading/>
                    <Conversation/>
                    <ChatInput/>
                </div>
            }
            {
                state.menuContent === "folders" && 
                <div className='flex flex-col h-full w-full bg-terceary'>
                    <Folders/>
                </div>
            }
            {
                state.menuContent === "contactProfile" && 
                <div className="flex w-full">
                    <ContactProfile/>
                </div>
            }
            {
                state.menuContent === "contacts" && 
                <div className="bg-secondary border-r-2 border-slate-100 h-full w-full md:w-[40rem]">
                    <ContactList/>
                </div>
            }
            {
                state.menuContent === "addContact" && 
                <div className="bg-secondary border-r-2 border-slate-100 h-full w-full md:w-[40rem]">
                    <AddContact/>
                </div>
            }
            {
                state.menuContent === "settings" && 
                <div className="bg-secondary border-r-2 border-slate-100 h-full w-full md:w-[40rem]">
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
                </div>
            }
        </div>
     );
}
 
export default MobileChat;