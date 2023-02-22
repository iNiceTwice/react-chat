import { useState } from "react"
import axios from "axios"

const AddContact = () => {

    const [ contactID, setContactID ] = useState<string>()
    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    
    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault()
        axios.put(`http://localhost:3000/addContact`,{
            contactID,
            userID:user.publicId
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="w-full mt-2">
                <h2 className="text-2xl py-4 text-primary font-bold">Add a Contact</h2>
            </div>
            <div className="flex flex-col">
                <form onSubmit={ handleSubmit } className="flex flex-col gap-2 mt-16">
                    <label htmlFor="contact" className="text-slate-800/80">His/Her public id:</label>
                    <input 
                        autoFocus
                        placeholder="username#9430"
                        name="contact"
                        type="text" 
                        className="px-4 py-2 rounded-full w-full bg-terceary shadow-sm outline-none" 
                        onChange={ (e) => setContactID(e.target.value) }
                    />
                    <button type="submit" className="px-4 py-2 bg-primary shadow-sm rounded-full text-white hover:bg-primary/80 transition-colors">Add</button>
                </form>
            </div>
        </>
     );
}
 
export default AddContact;