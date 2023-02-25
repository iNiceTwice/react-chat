import { useContext, useState } from "react";
import { HomeContext } from "../../context/home/homeContext";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"

const GuestAuth = () => {

    const [ username, setUsername ] = useState<string>("")
    const { setState } = useContext(HomeContext)
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    return ( 
        <>
            <div className="flex flex-col justify-center items-center gap-4 ml-14">
                <div className=" ">
                    <img className="rounded-full w-56 h-56 bg-primary shadow-primary/40 shadow-lg" src={`https://api.dicebear.com/5.x/big-smile/svg?seed=${username}`}/>
                </div>
                <form className="flex flex-col w-72 gap-3">
                    <input onChange={handleChange} className="py-1 px-4 outline-none rounded-full shadow-sm" placeholder="Your username..."/>
                    <button className="p-1 bg-primary text-white rounded-full">Start Chatting!</button>
                    <a onClick={()=>setState({ authOption:null })} className="flex gap-1 items-center cursor-pointer text-sm text-primary"><HiOutlineArrowLongLeft size={20}/>Back</a>
                </form>
            </div>
        </>
    );
}
 
export default GuestAuth;