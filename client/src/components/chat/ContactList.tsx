import Contact from "./Contact";
import axios from "axios"
import { useState, useEffect } from "react";
import { ConversationData } from "../../types";

const ContactList = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string) 
    const encodedUserID = user.publicId.replace("#","%23")
    const [contacts, setContacts] = useState<ConversationData[]>();

    const getContacts = ():void => {
        axios.get(`http://localhost:3000/get/conversation?userID=${encodedUserID}`)
            .then(res => setContacts(res.data))        
            .catch(err => console.log(err))        
    }

    useEffect(() => {
        getContacts()
    }, []);
    console.log(contacts)
    return ( 
        <>
            <div className="w-full mt-2">
                <h2 className="text-2xl py-4 text-primary font-bold">Messages</h2>
            </div>
            <div className="pb-4">
                <input className="w-full rounded-full shadow-sm px-4 py-2 text-sm bg-terceary outline-none" placeholder="Search..."/>
            </div>
            {
                contacts?.map((contact)=>(
                    <Contact username={contact.contactName} img={contact.contactImage} />                     
                ))
            }
        </>
     );
}
 
export default ContactList;