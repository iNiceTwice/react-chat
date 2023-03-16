import { CiLight, CiDark } from "react-icons/ci";
import Switch from '@mui/material/Switch';
import axios from "../api/axios.config"
import { useState } from "react";

const ThemeSwitch = () => {

    const user = JSON.parse(localStorage.getItem("chatUser") as string)
    const [theme, setTheme] = useState<Boolean>(user?.theme === "dark");

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {

        setTheme(event.target.checked)
        
        localStorage.setItem("chatUser", JSON.stringify({...user, theme:event.target.checked ? "dark" : "light" }))
  
        axios.put("/theme", {
            id:user.publicId,
            theme: event.target.checked ? "dark" : "light"
        })

        event.target.checked ?
        document.querySelector("html")?.classList.add("dark")
        :
        document.querySelector("html")?.classList.remove("dark")

    }

    return ( 
        <div className="flex gap-x-4 items-center text-slate-800 dark:text-slate-200 mt-4">
            <CiLight size={25} />
            <Switch checked={user?.theme === "dark"} onChange={event => handleChange(event)}/>
            <CiDark size={25} />
        </div> 
     );
}
 
export default ThemeSwitch;