import { HomeContext } from "../../context/home/homeContext";
import { useContext } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2"

const Register = () => {

    const { setState } = useContext(HomeContext)

    return ( 
        <>
            <form className="flex flex-col gap-3 m-12 text-slate-800 w-80">
                <div className="flex flex-col gap-1">
                    <label>Username</label>
                    <input placeholder="eg.: Jhon Doe" className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                </div>
                <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input className="shadow-sm py-1 px-4 rounded-full outline-none" />    
                </div>
                <div className="flex flex-col gap-1">
                    <label>Password</label>
                    <input type="password" className="shadow-sm py-1 px-4 rounded-full outline-none"/>    
                </div>
                <button type="submit" className="shadow-sm bg-primary text-white rounded-full p-1 mt-2 outline-none focus:bg-primary/80 hover:bg-primary/80">Register</button>
                <a onClick={()=>setState({ authOption:null })} className="flex gap-1 items-center cursor-pointer text-sm text-primary"><HiOutlineArrowLongLeft size={20}/>Back</a>
            </form>
        </>
     );
}
 
export default Register;