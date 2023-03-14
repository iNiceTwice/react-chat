import Contact from "./Contact";
import { useState, useContext } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { ContactData } from "../../types";
import ContactSkeleton from "./ContactSkeleton";
import axios from "../../api/axios.config"

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
        <>
            <div className="w-full p-5">
                <h2 className="text-2xl py-4 text-primary font-bold">Messages</h2>
            </div>
            <div className="px-4 mb-6">
                <input autoFocus onChange={handleChange} className="w-full rounded-full shadow-sm px-4 py-2 text-sm bg-slate-100 outline-none" placeholder="Search..."/>
            </div>
            <div className="flex flex-col w-full">
                {
                    state.isLoadingContacts && 
                    <div className="flex flex-col w-full gap-10 px-4 mt-6">
                        <ContactSkeleton/>
                        <ContactSkeleton/>
                        <ContactSkeleton/>
                        <ContactSkeleton/>
                    </div>
                }
                {
                    filter === "" ? 
                    state.contactsData?.map((contact)=>(
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
                    ))
                    :
                    filteredContacts?.map((contact)=>(
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
                    ))
                }
            </div>
        </>
     );
}


 
export default ContactList;