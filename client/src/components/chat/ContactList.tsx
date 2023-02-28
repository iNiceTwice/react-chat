import Contact from "./Contact";
import { useState, useContext } from "react";
import { ChatContext } from "../../context/chat/chatContext";
import { ContactData } from "../../types";

const ContactList = () => {

    const { state, setState } = useContext(ChatContext)
    const [ filter, setFilter ] = useState<string>("")
    const filteredContacts = state.contactsData?.filter((contact) => contact.contactName.includes(filter))

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }
    
    const setCurrentConversation = (contact:ContactData) => {
        setState(prev => ({...prev, currentConversation:contact}))
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
                    filter === "" ? 
                    state.contactsData?.map((contact)=>(
                        <button className="w-full" onClick={() => setCurrentConversation(contact)} key={contact.contactID}>
                            <Contact username={contact.contactName} img={contact.contactImage} lastMessage={contact.lastMessage?.text} />                     
                        </button>
                    ))
                    :
                    filteredContacts?.map((contact)=>(
                        <button className="w-full" onClick={() => setCurrentConversation(contact)} key={contact.contactID}>
                            <Contact username={contact.contactName} img={contact.contactImage} lastMessage={contact.lastMessage?.text}/>                     
                        </button>
                    ))
                }
            </div>
        </>
     );
}
 
export default ContactList;