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
import Settings from './Settings';
import SideDisplay from './SideDisplay';
import UserProfile from './UserProfile';


const MobileChat = () => {
    
    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const { state } = useContext(ChatContext)
    
    return ( 
        <div className="flex w-full h-full md:hidden overflow-hidden">
            {
                state.showContactProfile && 
                <div className="flex w-full">
                    <ContactProfile/>
                </div>
            }
            {
                (state.menuContent === "chat" && !state.showContactProfile) &&
                <div className='flex flex-col h-full w-full bg-tertiary dark:bg-tertiary_dark'>
                    <Heading/>
                    <Conversation/>
                    <ChatInput/>
                </div>
            }
            {
                (state.menuContent === "folders" && !state.showContactProfile) &&
                <div className='flex flex-col h-full w-full bg-tertiary dark:bg-tertiary_dark'>
                    <Folders/>
                </div>
            }
            {
                (state.menuContent === "contacts" && !state.showContactProfile) &&
                <div className="bg-secondary border-r-2 border-slate-100 dark:bg-secondary_dark dark:border-tertiary_dark h-full w-full md:w-[40rem]">
                    <ContactList/>
                </div>
            }
            {
                (state.menuContent === "addContact" && !state.showContactProfile) &&
                <div className="bg-secondary border-r-2 border-slate-100 dark:bg-secondary_dark dark:border-tertiary_dark h-full w-full md:w-[40rem]">
                    <AddContact/>
                </div>
            }
            {
                (state.menuContent === "settings" && !state.showContactProfile) &&
                <div className="bg-secondary border-r-2 border-slate-100 dark:bg-secondary_dark dark:border-tertiary_dark h-full w-full md:w-[40rem]">
                    <Settings/>
                </div>
            }
        </div>
     );
}
 
export default MobileChat;