import Contact from "./Contact";
import { useState, useContext } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { ContactData } from "../../types";
import ContactSkeleton from "./ContactSkeleton";
import axios from "../../api/axios.config"
import Menu from "./Menu";
import { CiSearch } from "react-icons/ci";
import AnimatedListItem from "../animations/AnimatedListItem";
import AnimatedListContainer from "../animations/AnimatedListContainer";

const ContactList = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const { state, setState } = useContext(ChatContext)
    const [ filter, setFilter ] = useState<string>("")
    const filteredContacts = state.contactsData?.filter((contact) => contact.contactName.includes(filter))

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }
    
    const setCurrentConversation = (contact:ContactData) => {
        if(contact.lastMessage?.sendedAt !== ""){
            axios.put("/messages",{
                conversationId:contact.id,
                sender:contact.lastMessage?.sender,
            })
        }
        setState(prev => ({
            ...prev, 
            menuContent:"chat",
            currentConversation:contact,
            contactsData: prev.contactsData.map(c => {
                if(c.contactID === contact.contactID){
                    return {
                        ...c,
                        unreadMessages:0
                    }
                }
                return c
            })
        }))
    }

    return ( 
        <div>
            <div className="flex justify-between w-full p-5">
                <h2 className="text-2xl py-4 text-primary font-bold">Messages</h2>
                <Menu/>
            </div>
            <div className="px-4 mb-6 w-full">
                <div className="bg-slate-100 dark:bg-tertiary_dark dark:text-slate-200 shadow-sm rounded-full flex items-center">
                    <input autoFocus onChange={handleChange} className=" dark:bg-tertiary_dark dark:text-slate-200 w-full rounded-full px-4 py-2 text-sm bg-slate-100 outline-none" placeholder="Search..."/>
                    <div className="p-1 mr-2">
                        <CiSearch size={20} className="text-slate-400 dark:text-slate-200" />
                    </div>
                </div>
            </div>
            {
                state.isLoadingContacts ? 
                <div className="flex flex-col w-full gap-10 px-4 mt-6">
                    <ContactSkeleton/>
                    <ContactSkeleton/>
                    <ContactSkeleton/>
                    <ContactSkeleton/>
                </div>
                :
                <AnimatedListContainer className="flex flex-col w-full h-full styled-scrollbar overflow-y-auto pb-16">
                    {
                        filter === "" ? 
                        state.contactsData?.map((contact)=>(
                            <AnimatedListItem>
                                <button className="w-full" onClick={() => setCurrentConversation(contact)} key={contact.contactID}>
                                    <Contact 
                                        username={contact.contactName}
                                        isOnline={contact.isOnline} 
                                        img={contact.contactImage}
                                        unreadMessages={contact.unreadMessages} 
                                        lastMessage={contact.lastMessage?.sender === user.name ? `You: ${contact.lastMessage?.text}` : contact.lastMessage?.text}
                                        lastMessageTime={contact.lastMessage?.text && new Date(contact.lastMessage?.sendedAt).toTimeString().slice(0,5)}
                                    />                     
                                </button>
                            </AnimatedListItem>
                        ))
                        :
                        filteredContacts?.map((contact)=>(
                            <AnimatedListItem>
                                <button className="w-full" onClick={() => setCurrentConversation(contact)} key={contact.contactID}>
                                    <Contact 
                                        username={contact.contactName} 
                                        isOnline={contact.isOnline} 
                                        img={contact.contactImage} 
                                        unreadMessages={contact.unreadMessages} 
                                        lastMessage={contact.contactID === user.publicId ? `You: ${contact.lastMessage?.text}` : contact.lastMessage?.text}
                                        lastMessageTime={contact.lastMessage?.text && new Date(contact.lastMessage?.sendedAt).toTimeString().slice(0,5)}
                                    />                     
                                </button>
                            </AnimatedListItem>
                        ))
                    }
                </AnimatedListContainer>
            }
        </div>
     );
}


 
export default ContactList;