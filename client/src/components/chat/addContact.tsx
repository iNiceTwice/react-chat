import { useContext, useState } from "react"
import axios from "../../api/axios.config"
import ErrorMessage from "../ErrorMessage"
import Menu from "./Menu"
import { toast} from 'react-toastify'
import { ChatContext } from "../../context/chat/chatContext"

interface Error {
    isError: boolean,
    message: string
}

const AddContact = () => {

    const { setState, getContacts } = useContext(ChatContext)
    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const notify = () => toast.success("Contact added!")
    const [ contactID, setContactID ] = useState<string>()
    const [ error, setError ] = useState<Error>({
        isError:false,
        message:""
    })
    
    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        axios.post(`/conversation`,{ user:user.publicId, newContact: contactID})
            .then(res => {
                getContacts()
                notify()
                setState(prev => ({...prev, menuContent:"contacts"}))
            })
            .catch(err => {
                console.log(err)
                setError({isError:true, message:err.response.data.message}) 
            })
    }

    return (
        <>
            <div className="flex justify-between w-full p-5">
                <h2 className="text-2xl py-4 text-primary font-bold">Add a contact</h2>
                <Menu/>
            </div>
            <div className="flex flex-col p-5">
                <form onSubmit={ handleSubmit } className="flex flex-col gap-2 mt-16">
                    {
                        error.isError && <ErrorMessage message={error.message} />
                    }
                    <label htmlFor="contact" className="text-slate-800/80">His/Her public id:</label>
                    <input 
                        autoFocus
                        placeholder="username#9430"
                        name="contact"
                        type="text" 
                        className="px-4 py-2 rounded-full w-full bg-slate-100 shadow-sm outline-none" 
                        onChange={ (e) => setContactID(e.target.value) }
                    />
                    <button type="submit" className="px-4 py-2 bg-primary shadow-sm rounded-full text-white hover:bg-primary/80 transition-colors">Add</button>
                </form>
            </div>
        </>
     );
}
 
export default AddContact;