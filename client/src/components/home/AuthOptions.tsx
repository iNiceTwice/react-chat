import { HomeContext } from "../../context/home/homeContext";
import { useContext } from "react";
import { CiUser, CiLogin, CiBeerMugFull } from "react-icons/ci"
import Login from "./Login";
import Register from "./Register";
import GuestAuth from "./GuestAuth";

const ButtonGroup = () => {
    const { setState } = useContext(HomeContext)

    return (
        <div className="flex justify-center mt-10 gap-6 ml-14">
            <div className="flex flex-col justify-center items-center gap-4">
                <button onClick={()=> setState({authOption:"register"})} className="rounded-full p-4 shadow-md h-fit hover:scale-105">
                    <CiUser size={25}/>
                </button>
                <p className="text-sm">Register</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <button onClick={()=> setState({authOption:"guest"})} className="rounded-full p-4 text-white shadow-lg h-fit hover:scale-105 shadow-primary/40 bg-primary">
                    <CiBeerMugFull size={25} />
                </button>
                <p className="text-sm">Enter as a guest</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <button onClick={()=> setState({authOption:"login"})} className="rounded-full p-4 shadow-md h-fit hover:scale-105">
                    <CiLogin size={25}/>
                </button>
                <p className="text-sm">Login</p>
            </div>
        </div>
    )
}


const AuthOptions = () => {
    const { state } = useContext(HomeContext)

    return ( 
        <>
            { state.authOption === null && <ButtonGroup/>}
            { state.authOption === "login" && <Login/>}
            { state.authOption === "register" && <Register/>}
            { state.authOption === "guest" && <GuestAuth/>}
        </>
        
     );
}
 
export default AuthOptions;