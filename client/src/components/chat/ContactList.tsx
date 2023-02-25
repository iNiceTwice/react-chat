import Contact from "./Contact";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../../context/chat/chatContext";

const ContactList = () => {

    const { state } = useContext(ChatContext)
    const [ filter, setFilter ] = useState<string>("")
    const filteredContacts = state.contactsData?.filter((contact) => contact.contactName.includes(filter))

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    return ( 
        <>
            <div className="w-full p-5">
                <h2 className="text-2xl py-4 text-primary font-bold">Messages</h2>
            </div>
            <div className="px-4 mb-6">
                <input autoFocus onChange={handleChange} className="w-full rounded-full shadow-sm px-4 py-2 text-sm bg-slate-100 outline-none" placeholder="Search..."/>
            </div>
            {
                filter === "" ? 
                state.contactsData?.map((contact)=>(
                    <div key={contact.contactID}>
                        <Contact username={contact.contactName} img={contact.contactImage} />                     
                    </div>
                ))
                :
                filteredContacts?.map((contact)=>(
                    <div key={contact.contactID}>
                        <Contact username={contact.contactName} img={contact.contactImage} />                     
                    </div>
                ))
            }
        </>
     );
}
 
export default ContactList;