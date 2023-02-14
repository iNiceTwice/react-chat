import Contact from "./Contact";

const ContactList = () => {
    return ( 
        <div className="bg-secondary border-r h-full w-1/4 p-5">
            <div className="w-full mt-2">
                <h2 className="text-2xl py-4 text-primary font-montserrat font-bold">Messages</h2>
            </div>
            <div className="pb-4">
                <input className="rounded-lg border px-4 py-2 text-sm bg-terceary outline-none" placeholder="Search..."/>
            </div>
            <Contact/>           
            <Contact/>           
            <Contact/>           
            <Contact/>           
        </div>
     );
}
 
export default ContactList;